import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {
  weekday = new Array('Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy');
  constructor() {}
  getTime() {
    var today = new Date();
    var day = this.weekday[today.getDay()];
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var hour = ('0' + h).slice(-2);
    var minutes = ('0' + m).slice(-2);
    var second = ('0' + s).slice(-2);
    var date = ('0' + dd).slice(-2);
    var month = ('0' + mm).slice(-2);
    var year = ('0' + yyyy).slice(-4);
    let nowTime = hour + ' giờ ' + minutes + ' phút ' + second + ' giây';
    return day + ', ' + date + '/' + month + '/' + year + ' - ' + nowTime;
  }
}
