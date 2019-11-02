import { Component, OnInit } from "@angular/core";
import { TransactionDetailService } from "../transaction-detail.service";

@Component({
  selector: "transaction-detail-card",
  templateUrl: "./transaction-detail-card.component.html",
  styleUrls: ["./transaction-detail-card.component.css"]
})
export class TransactionDetailCardComponent implements OnInit {
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
      BALANCE: "Balanço"
    }
  };
  public cards = [];
  public cd_transaction_type: any;
  constructor(private service: TransactionDetailService) {}

  ngOnInit() {
    this.getDetailCard();
  }

  getDetailCard() {
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
  }
}
