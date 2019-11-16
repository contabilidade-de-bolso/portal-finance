import { Component, OnInit, ViewChild } from "@angular/core";
import { FinanceGridComponent } from "src/app/shared/components/finance-grid/finance-grid.component";
import { TransactionDetailConfiguration } from "../transaction-detail-configuration";
import { ToastrService } from "ngx-toastr";
import { TransactionDetailService } from "../transaction-detail.service";

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
    private service: TransactionDetailService,
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
}
