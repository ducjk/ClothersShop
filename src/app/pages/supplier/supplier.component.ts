import { Component, OnInit } from '@angular/core';
import { DatetimeService } from 'src/app/core/service/date.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
  datetime: string = '';
  constructor(private dateService: DatetimeService) {}
  ngOnInit(): void {
    setInterval(() => {
      this.datetime = this.dateService.getTime();
    }, 1000);
  }
}
