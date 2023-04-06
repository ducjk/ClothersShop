import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/core/service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  constructor(private supplier: SupplierService) {}
  suppires: any;
  ngOnInit(): void {
    this.supplier.getSuppliers().subscribe((res) => {
      this.suppires = res;
    });
  }
}
