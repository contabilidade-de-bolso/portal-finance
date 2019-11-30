import { Component, OnInit, Input } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-message-confirmed-payment",
  templateUrl: "./modal-message-confirmed-payment.component.html",
  styleUrls: ["./modal-message-confirmed-payment.component.css"]
})
export class ModalMessageConfirmedPaymentComponent implements OnInit {
  private decimalPipe: DecimalPipe = new DecimalPipe("pt-BR");

  @Input() public params: any;
  @Input() public type: string;

  constructor(private modalRef: NgbActiveModal) {}

  ngOnInit() {}

  public getMessageModal = () => {
    const list = {
      CONFIRMED_PAYMENT: `Confirme o pagamento de R$ ${this.decimalPipe.transform(
        this.params.data.vl_transaction,
        "1.2-2"
      )} da operação ${this.params.data.nm_transaction} ?`,
      DELETE_TRANSACTION: `Confirme a exclusão da operação ${this.params.data.nm_transaction} ?`
    };

    return list[this.params.type] || "Mensagem não encontrada.";
  };

  public submitAction = () => {
    this.modalRef.close({
      doAction: true,
      id: this.params.data.id,
      type: this.params.type
    });
  };
}
