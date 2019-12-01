import { NgModule } from "@angular/core";
import { NewJourneyComponent } from "./new-journey.component";
import { NewJourneyRoutes } from "./new-journey.routing";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [NewJourneyComponent],
  imports: [SharedModule, NewJourneyRoutes]
})
export class NewJourneyModule {}
