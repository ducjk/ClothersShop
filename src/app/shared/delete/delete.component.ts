import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() id = 0;
  @Input() names = '';
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() successRemove = new EventEmitter<boolean>();
  constructor(private apiService: ApiService) {}

  closePopUp() {
    this.closePopup.emit(true);
  }

  deleteItem() {
    this.apiService.delete(this.id, this.names).subscribe(
      (next) => {
        this.successRemove.emit(true);
        this.closePopUp();
      },
      (error) => {
        console.log('error: ', error);

        this.successRemove.emit(false);
        this.closePopUp();
      }
    );
  }
}
