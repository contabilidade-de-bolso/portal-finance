import { Component, OnInit } from "@angular/core";
import { ResumeDashboardService } from "./resume-dashboarad.service";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "resumo-dashboard",
  templateUrl: "./resumo-dashboard.component.html",
  styleUrls: ["./resumo-dashboard.component.css"]
})
export class ResumoDashboardComponent implements OnInit {
  constructor(
    private service: ResumeDashboardService,
    private eventService: EventService
  ) {}

  public cardDetails = [];

  ngOnInit() {
    this.eventService.subscribe("REFRESH_RESUME_TRANSACTION", params =>
      this.refreshDashboard()
    );
    this.refreshDashboard();
  }

  public refreshDashboard = () => {
    this.service
      .getDetailDashboard()
      .then(resp => {
        this.cardDetails = resp.result;
      })
      .catch(err => {
        console.log("err", err);
      });
  };
}
