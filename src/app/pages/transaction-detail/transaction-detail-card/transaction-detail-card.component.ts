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
    PENDING: "fas fa-check",
    NOT_PENDING: "fas fa-check-double",
    BALANCE: "fas fa-balance-scale"
  };
  public title: any = {
    ENT: {
      PENDING: "Despesas Pendentes",
      NOT_PENDING: "Despesas Pagas",
      BALANCE: "Total"
    },
    SAI: {
      PENDING: "Receitas Pendentes",
      NOT_PENDING: "Receitas Recebidas",
      BALANCE: "Total"
    },
    AMB: {
      PENDING: "Pendentes",
      NOT_PENDING: "Pagas",
      BALANCE: "Recebidas"
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
        this.cards = resp.result.map(card => {
          card.title = this.title[card.cd_transaction_type][card.type];
          card.icon = this.icon[card.type];

          return card;
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };
}
