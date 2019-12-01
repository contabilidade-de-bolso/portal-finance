import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SessionUserService } from "./shared/services/session.user.service";
import { NewJourneyService } from "./shared/services/new-journey.service";

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
    path: "new-journey",
    loadChildren: "./pages/new-journey/new-journey.module#NewJourneyModule",
    canActivate: [SessionUserService]
  },
  {
    path: "home",
    loadChildren: "./pages/reports/reports.module#ReportsModule",
    canActivate: [SessionUserService, NewJourneyService]
  },
  {
    path: "transacao",
    loadChildren:
      "./pages/transaction-detail/transaction-detail.module#TransactionDetailModule",
    canActivate: [SessionUserService, NewJourneyService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
