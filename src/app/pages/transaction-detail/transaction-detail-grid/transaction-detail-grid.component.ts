import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FinanceGridComponent } from "src/app/shared/components/finance-grid/finance-grid.component";
import { TransactionDetailConfiguration } from "../transaction-detail-configuration";
import { ToastrService } from "ngx-toastr";
import { TransactionDetailService } from "../transaction-detail.service";
import { MDBModalService, MDBModalRef } from "angular-bootstrap-md";
import { EventService } from "src/app/core/services/event.service";
import { Subscription } from "rxjs";
import { ModalMessageConfirmedPaymentComponent } from "./modal-message-confirmed-payment/modal-message-confirmed-payment.component";
import { NewTransactionComponent } from "src/app/shared/components/new-transaction/new-transaction.component";

@Component({
  selector: "transaction-detail-grid",
  templateUrl: "./transaction-detail-grid.component.html",
  styleUrls: ["./transaction-detail-grid.component.css"],
  providers: []
})
export class TransactionDetailGridComponent implements OnInit, OnDestroy {
  @ViewChild("transacrionDetail")
  public modalRef: MDBModalRef;
  public transacrionDetail: FinanceGridComponent;
  public call_update_transaction_pending_subscribe: Subscription;
  public call_update_transaction_subscribe: Subscription;
  public call_delete_transaction_subscribe: Subscription;
  public refresh_resume_transaction_subscribe: Subscription;

  public gridOptions: any;
  public columnDefs: any;
  public frameworkComponents: any;

  constructor(
    private service: TransactionDetailService,
    private configuration: TransactionDetailConfiguration,
    private toastr: ToastrService,
    private modalService: MDBModalService,
    private eventService: EventService
  ) {
    this.subscribe();
    this.columnDefs = this.configuration.getColumnsDefs();
  }

  ngOnInit() {
    this.getOptions();
    this.refreshTransactionDetail();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe = () => {
    this.call_update_transaction_subscribe = this.eventService.subscribe(
      "CALL_UPDATE_TRANSACTION",
      this.modalUpdateTransaction
    );

    this.call_update_transaction_pending_subscribe = this.eventService.subscribe(
      "CALL_UPDATE_PENDING_TRANSACTION",
      this.modalMessageConfirmedPayment
    );

    this.call_delete_transaction_subscribe = this.eventService.subscribe(
      "CALL_DELETE_TRANSACTION",
      this.modalMessageConfirmedPayment
    );

    this.refresh_resume_transaction_subscribe = this.eventService.subscribe(
      "REFRESH_RESUME_TRANSACTION",
      this.refreshTransactionDetail
    );
  };

  unsubscribe() {
    this.eventService.unsubscribe(
      this.call_update_transaction_pending_subscribe
    );
    this.eventService.unsubscribe(this.call_delete_transaction_subscribe);
    this.eventService.unsubscribe(this.refresh_resume_transaction_subscribe);
    this.eventService.unsubscribe(this.call_update_transaction_subscribe);
  }

  public getOptions() {
    this.gridOptions = this.configuration.getOptionsGrid();
  }

  public refreshTransactionDetail = () => {
    this.service
      .getTransactionDetailGrid()
      .then(resp => {
        const { result } = resp;
        this.frameworkComponents = this.configuration.getFrameworkComponents().FRAMEWORKCOMPONENTS.CATEGORY;
        this.gridOptions.columnDefs = this.columnDefs.COLUMNSDEF.CATEGORY;
        this.gridOptions.rowData = result;
      })
      .catch(err => {
        this.toastr.error("Não foi possível carregar seus dados.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });
  };

  public deleteTransaction = async id => {
    await this.service
      .deleteTransaction(id)
      .then(resp => {
        if (resp.success) {
          this.toastr.success("Exclusão efetuada com successo.", "Parabéns", {
            timeOut: 5000,
            positionClass: "toast-bottom-left"
          });

          this.refreshTransactionDetail();
        }
      })
      .catch(err => {
        this.toastr.error(
          "Erro ao atualizar os dados do transação.",
          "Desculpe",
          {
            timeOut: 5000,
            positionClass: "toast-bottom-right"
          }
        );
        console.log("err", err);
      });

    this.eventService.dispatch("REFRESH_TRANSACTION_DETAIL_CARD", true);
  };

  public updateTransactionPending = async id => {
    await this.service
      .updateTransactionPending(id)
      .then(resp => {
        if (resp.success) {
          this.toastr.success(
            "Atualização efetuada com successo.",
            "Parabéns",
            {
              timeOut: 5000,
              positionClass: "toast-bottom-left"
            }
          );

          this.refreshTransactionDetail();
        }
      })
      .catch(err => {
        this.toastr.error(
          "Erro ao atualizar os dados do transação.",
          "Desculpe",
          {
            timeOut: 5000,
            positionClass: "toast-bottom-right"
          }
        );
        console.log("err", err);
      });

    this.eventService.dispatch("REFRESH_TRANSACTION_DETAIL_CARD", true);
  };

  public getMethodByName = (method: string, params: any) => {
    const list = {
      CONFIRMED_PAYMENT: this.updateTransactionPending,
      DELETE_TRANSACTION: this.deleteTransaction
    };

    return (
      list[method](params.id) || alert("Não foi possível atualizar os dados.")
    );
  };

  public modalUpdateTransaction = params => {
    console.log("modalUpdateTransaction", params);
    this.modalRef = this.modalService.show(NewTransactionComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right",
      containerClass: "right",
      animated: true,
      data: {}
    });
  };

  public modalMessageConfirmedPayment = params => {
    this.modalRef = this.modalService.show(
      ModalMessageConfirmedPaymentComponent,
      {
        backdrop: true,
        keyboard: true,
        show: false,
        class: "modal-md",
        animated: true,
        data: { data: params.data, type: params.type }
      }
    );

    this.modalRef.content.action.subscribe(async (result: any) => {
      const { doAction, id, type } = result;
      if (doAction) this.getMethodByName(type, { id });
    });
  };
}
