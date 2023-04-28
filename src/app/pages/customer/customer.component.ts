import { Component } from '@angular/core';
import { DatetimeService } from 'src/app/core/service/date.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  datetime: string = '';
  idTime: any;
  constructor(private dateService: DatetimeService) {}
  ngOnInit(): void {
    this.idTime = setInterval(() => {
      this.datetime = this.dateService.getTime();
    }, 1000);
  }
  ngOnDestroy() {
    if (this.idTime) {
      clearInterval(this.idTime);
    }
  }
}
