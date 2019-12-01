import { Routes, RouterModule } from "@angular/router";
import { NewJourneyComponent } from "./new-journey.component";

const routes: Routes = [
  {
    path: "",
    component: NewJourneyComponent
  }
];

export const NewJourneyRoutes = RouterModule.forChild(routes);
