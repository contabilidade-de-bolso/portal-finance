import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    ToastContainerModule,
    BrowserAnimationsModule, // required animations module
  ],
  exports:[
    HttpClientModule
  ]
})
export class CoreModule { }
