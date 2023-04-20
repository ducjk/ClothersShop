import { Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'login',
    title: 'Đăng nhập',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    title: 'Đăng ký',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./shared/master/master.module').then((m) => m.MasterModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotfoundComponent },
];

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`DH Shop | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
