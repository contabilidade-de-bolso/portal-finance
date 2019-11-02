import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginAuthComponent, LoginFormComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
