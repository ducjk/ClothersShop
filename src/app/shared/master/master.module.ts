import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { MasterRoutingModule } from './master-routing.module';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [MasterComponent, HeaderComponent, SidebarComponent, FooterComponent],
  imports: [MasterRoutingModule],
})
export class MasterModule {}
