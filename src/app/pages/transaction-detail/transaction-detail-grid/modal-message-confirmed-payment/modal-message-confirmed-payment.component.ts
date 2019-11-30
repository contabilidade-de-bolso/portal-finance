import { Component, OnInit } from "@angular/core";
import { MDBModalRef } from "angular-bootstrap-md";
import { DecimalPipe } from "@angular/common";
import { Subject } from "rxjs";

@Component({
  selector: "app-modal-message-confirmed-payment",
  templateUrl: "./modal-message-confirmed-payment.component.html",
  styleUrls: ["./modal-message-confirmed-payment.component.css"]
})
export class ModalMessageConfirmedPaymentComponent implements OnInit {
  private decimalPipe: DecimalPipe = new DecimalPipe("pt-BR");
  public action: any = new Subject();

  public data: any;
  public type: string;

  constructor(private modalRef: MDBModalRef) {}

  ngOnInit() {}

  public getMessageModal = () => {
    const list = {
      CONFIRMED_PAYMENT: `Confirme o pagamento de R$ ${this.decimalPipe.transform(
        this.data.vl_transaction,
        "1.2-2"
      )} da operação ${this.data.nm_transaction} ?`,
      DELETE_TRANSACTION: `Confirme a exclusão da operação ${this.data.nm_transaction} ?`
    };

    return list[this.type] || "Mensagem não encontrada.";
  };

  public submitAction = () => {
    this.action.next({
      doAction: true,
      id: this.data.id,
      type: this.type
    });
    this.modalRef.hide();
  };
}
