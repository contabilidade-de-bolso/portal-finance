import { NgModule } from "@angular/core";
import { TransactionDetailRoutingModule } from "./transaction-detail-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [SharedModule, TransactionDetailRoutingModule],
  declarations: []
})
export class TransactionDetailModule {}
