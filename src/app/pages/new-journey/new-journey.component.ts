import { Component, OnInit } from "@angular/core";
import { ListNavBar } from "src/app/shared/components/navbar/navbar.component";
import { Subscription } from "rxjs";
import { EventService } from "src/app/core/services/event.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-journey",
  templateUrl: "./new-journey.component.html",
  styleUrls: ["./new-journey.component.css"]
})
export class NewJourneyComponent implements OnInit {
  public refresh_transaction_detail_card_subscribe: Subscription;
  public list_nav_bar: Array<ListNavBar> = [
    { text: "Resumo", link: "/", active: "active" }
  ];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.refresh_transaction_detail_card_subscribe = this.eventService.subscribe(
      "REFRESH_TRANSACTION_DETAIL_CARD",
      () => {
        if (this.router.url == "/new-journey") this.router.navigate(["/home"]);
      }
    );
  }
}
