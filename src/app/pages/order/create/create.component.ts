import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/components/customer';
import { Employee } from 'src/app/components/employee';
import { ItemCart } from 'src/app/components/itemCart';
import { Order } from 'src/app/components/order';
import { orderDetail } from 'src/app/components/order-detail';
import { Product } from 'src/app/components/product';
import { CustomerService } from 'src/app/core/service/customer.service';
import { EmployeeService } from 'src/app/core/service/employee.service';
import { OrderDetailService } from 'src/app/core/service/order-detail.service';
import { OrderService } from 'src/app/core/service/order.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateOrderComponent {
  searchForm!: FormGroup;
  orderForm!: FormGroup;
  product!: Product[];
  employees!: Employee[];
  customers!: Customer[];

  totalItem = 1;
  currentPage = 1;
  limit = 5;

  day = new Date();
  jstoday = '';
  listOfProducts: ItemCart[] = [];
  total = 0;
  sumTotal = 0;
  order!: Order[];
  orderItem!: Order;
  orderCart = {};
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {
    this.jstoday = formatDate(this.day, 'dd-MM-yyyy hh:mm:ss a', 'en-US', 'UCT+7');
  }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: [],
    });
    this.productService
      .getProductsWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.product = res.body;
        console.log(this.product);
      });

    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
    });
    this.customerService.getCustomer().subscribe((res) => {
      this.customers = res;
    });
    this.orderForm = this.formBuilder.group({
      CustomerId: '',
      EmployeeId: '',
      status: 0,
      orderTime: [this.jstoday],
      acceptTime: '',
      shippingTime: '',
      finishedTime: '',
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  // filter

  onSearch() {
    this.productService
      .getProductsWithPage(this.searchForm.value.searchValue, this.currentPage, this.limit)
      .subscribe((res: any) => {
        this.totalItem = +res.headers.get('X-Total-Count');
        this.product = res.body;
      });
  }
  onAddItem(itemProduct: Product) {
    let idx = this.listOfProducts.findIndex((item: any) => {
      return item.productId === itemProduct.id;
    });

    if (idx !== -1) {
      this.listOfProducts[idx].quantity += 1;
      this.listOfProducts[idx].total =
        this.listOfProducts[idx].quantity * this.listOfProducts[idx].price;
    } else {
      let itemCart: ItemCart = {
        id: Date.now(),
        productId: itemProduct.id,
        productName: itemProduct.productName,
        quantity: 1,
        price: itemProduct.price,
        total: itemProduct.price,
      };
      console.log('itemcart:', itemCart);
      this.listOfProducts.push(itemCart);
      console.log(this.listOfProducts);
    }
    this.sumTotal = this.listOfProducts.reduce((ar: any, item: any) => {
      return (ar += item.total);
    }, 0);
  }
  onAddOrder() {
    const employeeName = this.employees.find(
      (item) => (item.id = this.orderForm.value.EmployeeId)
    )?.fullName;
    const customerName = this.customers.find(
      (item) => (item.id = this.orderForm.value.CustomerId)
    )?.customerName;
    this.orderForm.addControl('customerName', new FormControl(customerName));
    this.orderForm.addControl('employeeName', new FormControl(employeeName));

    this.orderService.add(this.orderForm.value).subscribe((res) => {
      this.orderService.getOrders().subscribe((res) => {
        this.order = res;
        this.orderItem = { ...this.orderItem, ...this.order[this.order.length - 1] };
        let idOrder: number = this.orderItem['id'];
        this.listOfProducts.forEach((element: any) => {
          element['OrderId'] = idOrder;
          this.orderDetailService.add(element).subscribe((res) => {});
        });
      });
      confirm('Khởi tạo đơn hàng thành công');
    });
  }
  onDelete(id: number): void {
    this.listOfProducts.forEach((product: ItemCart) => {
      if (product.productId === id) {
        this.sumTotal -= product.total;
      }
    });

    this.listOfProducts = this.listOfProducts.filter((p: ItemCart) => {
      return p.productId !== id;
    });
  }

  onChange(quantity: number, productId: number): void {
    this.listOfProducts.forEach((itemcart: ItemCart) => {
      if (itemcart.productId === productId) {
        this.sumTotal -= itemcart.total;
        itemcart.total = quantity * itemcart.price;
        this.sumTotal += itemcart.total;
      }
    });
  }
}
