import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SessionUserService } from "./shared/services/session.user.service";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./pages/login/login.module#LoginModule"
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginModule"
  },
  {
    path: "home",
    loadChildren: "./pages/reports/reports.module#ReportsModule",
    canActivate: [SessionUserService]
  },
  {
    path: "transacao",
    loadChildren:
      "./pages/transaction-detail/transaction-detail.module#TransactionDetailModule",
    canActivate: [SessionUserService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
