import { Component } from '@angular/core';
import { User } from 'src/app/components/user';
import { UserService } from 'src/app/core/service/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user!: User;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onHiddenSideBar() {}
}
