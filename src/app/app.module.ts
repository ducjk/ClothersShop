import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MasterComponent } from './shared/master/master.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    ProductComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    MasterComponent,
    SidebarComponent,
    SupplierComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
