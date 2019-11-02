import { Routes, RouterModule } from "@angular/router";
import { TransactionDetailComponent } from "./transaction-detail.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionDetailComponent
  }
];

export const TransactionDetailRoutingModule = RouterModule.forChild(routes);
