import { Component, OnInit } from "@angular/core";
import { TransactionDetailService } from "../transaction-detail.service";
import { Subscription } from "rxjs";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "transaction-detail-card",
  templateUrl: "./transaction-detail-card.component.html",
  styleUrls: ["./transaction-detail-card.component.css"]
})
export class TransactionDetailCardComponent implements OnInit {
  public refresh_resume_transaction_subscribe: Subscription;
  public refresh_transaction_detail_card_subscribe: Subscription;

  public icon: any = {
    TO_RECEIVE: "fas fa-hand-holding-usd",
    RECEIVED: "fas fa-heart",
    PAYABLE: "fas fa-money-check-alt",
    PAID: "fas fa-check-double"
  };
  public title: any = {
    AMB: {
      TO_RECEIVE: "A Receber",
      RECEIVED: "Recebido",
      PAYABLE: "A Pagar",
      PAID: "Pago"
    }
  };
  public cards = [];
  public cd_transaction_type: any;
  constructor(
    private service: TransactionDetailService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.getDetailCard();

    this.refresh_resume_transaction_subscribe = this.eventService.subscribe(
      "REFRESH_RESUME_TRANSACTION",
      this.getDetailCard
    );

    this.refresh_transaction_detail_card_subscribe = this.eventService.subscribe(
      "REFRESH_TRANSACTION_DETAIL_CARD",
      this.getDetailCard
    );
  }

  ngOnDestroy(): void {
    this.eventService.unsubscribe(this.refresh_resume_transaction_subscribe);
    this.eventService.unsubscribe(
      this.refresh_transaction_detail_card_subscribe
    );
  }

  getDetailCard = () => {
    this.service
      .getDetailCard(this.cd_transaction_type)
      .then(resp => {
        this.cards = resp.result
          .map(card => {
            card.title = this.title[card.cd_transaction_type][card.name];
            card.icon = this.icon[card.name];

            return card;
          })
          .sort((a, b) => b.vl_transaction - a.vl_transaction);
      })
      .catch(err => {
        console.log("err", err);
      });
  };
}
