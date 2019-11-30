import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { BreadCrumbComponent } from "./components/bread-crumb/bread-crumb.component";
import { FormFieldErrorComponent } from "./components/form-field-error/form-field-error.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { ServerErrorMessagesComponent } from "./components/server-error-messages/server-error-messages.component";
import { RouterModule } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";


import {
  NgbModule,
  NgbDatepickerI18n,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { ListActionLeftComponent } from "./components/list-action-left/list-action-left.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NewTransactionComponent } from "./components/new-transaction/new-transaction.component";

import { HighchartsChartComponent } from "highcharts-angular";
import { NgxCurrencyModule } from "ngx-currency";
import { I18n, CustomDatepickerI18n } from "./utils/ngbd-datepicker-i18n";
import { NgbDatePTParserFormatter } from "./utils/datapicker/NgbDatePTParserFormatter";
import { ResumoDashboardComponent } from "./components/resumo-dashboard/resumo-dashboard.component";
import { ResumoTransactionComponent } from "./components/resumo-transaction/resumo-transaction.component";
import { FinanceGridComponent } from "./components/finance-grid/finance-grid.component";

import localePtBr from "@angular/common/locales/pt";

import { registerLocaleData } from "@angular/common";
import { CardDetailDashboardComponent } from "./components/resumo-dashboard/card-detail-dashboard/card-detail-dashboard.component";
import { FormatIntDatePipe } from "./pipes/formatIntDate";
import { TransactionDetailComponent } from "../pages/transaction-detail/transaction-detail.component";
import { TransactionDetailCardComponent } from "../pages/transaction-detail/transaction-detail-card/transaction-detail-card.component";
import { TransactionDetailChartComponent } from "../pages/transaction-detail/transaction-detail-chart/transaction-detail-chart.component";
import { TransactionDetailGridComponent } from "../pages/transaction-detail/transaction-detail-grid/transaction-detail-grid.component";
import { MessageSimpleComponent } from "./components/tooltip-custom/message-simple/message-simple.component";
import { ModalMessageConfirmedPaymentComponent } from "../pages/transaction-detail/transaction-detail-grid/modal-message-confirmed-payment/modal-message-confirmed-payment.component";

registerLocaleData(localePtBr);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    NgxCurrencyModule,
    AgGridModule.withComponents([MessageSimpleComponent])
  ],
  entryComponents: [
    NewTransactionComponent,
    ModalMessageConfirmedPaymentComponent
  ],
  declarations: [
    HighchartsChartComponent,
    BreadCrumbComponent,
    FormFieldErrorComponent,
    NavbarComponent,
    PageHeaderComponent,
    ServerErrorMessagesComponent,
    ListActionLeftComponent,
    NewTransactionComponent,
    ModalMessageConfirmedPaymentComponent,
    ResumoDashboardComponent,
    ResumoTransactionComponent,
    FinanceGridComponent,
    CardDetailDashboardComponent,
    TransactionDetailComponent,
    TransactionDetailCardComponent,
    TransactionDetailChartComponent,
    TransactionDetailGridComponent,

    //pipe
    FormatIntDatePipe,

    //tooltip
    MessageSimpleComponent
  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxCurrencyModule,

    // shared components
    HighchartsChartComponent,
    BreadCrumbComponent,
    FormFieldErrorComponent,
    PageHeaderComponent,
    NavbarComponent,
    ServerErrorMessagesComponent,
    ListActionLeftComponent,
    ResumoDashboardComponent,
    ResumoTransactionComponent,
    FinanceGridComponent,
    CardDetailDashboardComponent,
    TransactionDetailComponent,
    TransactionDetailCardComponent,
    TransactionDetailChartComponent,
    TransactionDetailGridComponent,

    //pipe
    FormatIntDatePipe
  ],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter },
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ]
})
export class SharedModule {}
