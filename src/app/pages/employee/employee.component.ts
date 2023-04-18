import { Component } from '@angular/core';
import { DatetimeService } from 'src/app/core/service/date.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
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
