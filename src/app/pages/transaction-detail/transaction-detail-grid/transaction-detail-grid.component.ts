import { Component, OnInit, ViewChild } from "@angular/core";
import { FinanceGridComponent } from "src/app/shared/components/finance-grid/finance-grid.component";
import { TransactionDetailConfiguration } from "../transaction-detail-configuration";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "transaction-detail-grid",
  templateUrl: "./transaction-detail-grid.component.html",
  styleUrls: ["./transaction-detail-grid.component.css"]
})
export class TransactionDetailGridComponent implements OnInit {
  @ViewChild("transacrionDetail")
  public transacrionDetail: FinanceGridComponent;

  public gridOptions: any;
  public columnDefs: any;
  public frameworkComponents: any;

  constructor(
    private configuration: TransactionDetailConfiguration,
    private toastr: ToastrService
  ) {
    this.columnDefs = this.configuration.getColumnsDefs();
  }

  ngOnInit() {
    this.getOptions();

    this.refreshTransactionDetail();
  }

  public getOptions() {
    this.gridOptions = this.configuration.getOptionsGrid();
  }

  public refreshTransactionDetail = () => {
    // this.service
    //   .getResumeTransactionGrid()
    //   .then(resp => {
    this.frameworkComponents = this.configuration.getFrameworkComponents().FRAMEWORKCOMPONENTS.CATEGORY;
    this.gridOptions.columnDefs = this.columnDefs.COLUMNSDEF.CATEGORY;
    this.gridOptions.rowData = [
      {
        nm_transaction: "Outrooooooo",
        category_group: { nm_category_group: "Renda" },
        dt_transaction: 20190923,
        vl_transaction: 9000,
        pending: false
      },
      {
        nm_transaction: "Mais uma",
        category_group: { nm_category_group: "Renda" },
        dt_transaction: 20190919,
        vl_transaction: 873.2,
        pending: true
      },
      {
        nm_transaction: "Facudlade",
        category_group: { nm_category_group: "Renda" },
        dt_transaction: 20190926,
        vl_transaction: 192.89,
        pending: true
      },
      {
        nm_transaction: "Douglas Santos",
        category_group: { nm_category_group: "Gastos Essenciais" },
        dt_transaction: 20190914,
        vl_transaction: 2938.92,
        pending: false
      },
      {
        nm_transaction: "Adicionando novo item",
        category_group: { nm_category_group: "Gastos Essenciais" },
        dt_transaction: 20190913,
        vl_transaction: 238.99,
        pending: true
      },
      {
        nm_transaction: "Outro item",
        category_group: { nm_category_group: "Gastos Essenciais" },
        dt_transaction: 20190903,
        vl_transaction: 909.99,
        pending: true
      },
      {
        nm_transaction: "Novo12",
        category_group: { nm_category_group: "Gastos Essenciais" },
        dt_transaction: 20190916,
        vl_transaction: 232.32,
        pending: true
      },
      {
        nm_transaction: "Outra transacao",
        category_group: { nm_category_group: "Gastos Essenciais" },
        dt_transaction: 20190903,
        vl_transaction: 209.99,
        pending: true
      },
      {
        nm_transaction: "eventservice",
        category_group: { nm_category_group: "Estilo de Vida" },
        dt_transaction: 20190922,
        vl_transaction: 298.89,
        pending: true
      },
      {
        nm_transaction: "Compra",
        category_group: { nm_category_group: "Estilo de Vida" },
        dt_transaction: 20190906,
        vl_transaction: 559.99,
        pending: true
      },
      {
        nm_transaction: "douglas santos",
        category_group: { nm_category_group: "Empréstimos" },
        dt_transaction: 20190920,
        vl_transaction: 2398.32,
        pending: false
      },
      {
        nm_transaction: "usisu",
        category_group: { nm_category_group: "Empréstimos" },
        dt_transaction: 20190911,
        vl_transaction: 1928.19,
        pending: false
      },
      {
        nm_transaction: "Mais um teste",
        category_group: { nm_category_group: "Lançamentos entre contas" },
        dt_transaction: 20190917,
        vl_transaction: 287.87,
        pending: true
      },
      {
        nm_transaction: "Fazendo outro teste",
        category_group: { nm_category_group: "Não classificado" },
        dt_transaction: 20190930,
        vl_transaction: 1002.9,
        pending: false
      }
    ];

    // })
    // .catch(err => {
    //   this.toastr.error("Não foi possível carregar seus dados.", "Desculpe", {
    //     timeOut: 5000,
    //     positionClass: "toast-bottom-right"
    //   });
    //   console.log("err", err);
    // });
  };
}
