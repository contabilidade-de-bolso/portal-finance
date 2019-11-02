import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {path: '', component: LoginAuthComponent},
  {path: 'new', component: LoginFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
