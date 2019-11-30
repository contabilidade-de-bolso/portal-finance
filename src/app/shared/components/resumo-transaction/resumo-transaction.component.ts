import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ResumoTransactionConfiguration } from "./resumo-transaction-configuration";
import { ResumeTransactionService } from "./resume-transanction.service";

import * as Highcharts from "highcharts";
import { chart } from "highcharts";
import { FinanceGridComponent } from "../finance-grid/finance-grid.component";
import { EventService } from "src/app/core/services/event.service";
import { ToastrService } from "ngx-toastr";
import { FooterGridTransaction } from "../../models/footer-grid-resumo-transaction.model";

@Component({
  selector: "resumo-transaction",
  templateUrl: "./resumo-transaction.component.html",
  styleUrls: ["./resumo-transaction.component.css"]
})
export class ResumoTransactionComponent implements OnInit {
  public options: Highcharts.Options;
  public chart: any;
  public highcharts = Highcharts;

  // GRID
  public title: any;
  public columnDefs: any;
  public rowData: any;
  public gridOptions: any;
  public pinnedTotalRow: any;

  public properties;
  public isEmptyChart: Boolean = true;

  @ViewChild("chartTarget") public chartTarget: ElementRef;
  @ViewChild("resumoTransactionGrid")
  public resumoTransactionGrid: FinanceGridComponent;

  constructor(
    private service: ResumeTransactionService,
    private configuration: ResumoTransactionConfiguration,
    private eventService: EventService,
    private toastr: ToastrService
  ) {
    this.properties = this.configuration.getPropertiesChart();
    this.columnDefs = this.configuration.getColumnsDefs();

    this.getOptions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setCharts();
    });
  }

  ngOnInit() {
    this.refreshResumeTransaction();
    this.eventService.subscribe("REFRESH_RESUME_TRANSACTION", () =>
      this.refreshResumeTransaction()
    );

    this.eventService.subscribe(
      "REFRESH_RESUME_TRANSACTION_CATEGORY",
      (params: any) => {
        const validator = Object.keys({ ...params }).filter(
          key => key == "category_group_sub"
        );

        if (validator.length) this.refreshResumeTransaction();
        else this.refreshResumeTransactionCategory(params.category_group_id);
      }
    );
  }

  public refreshResumeTransactionCategory = category_group_id => {
    this.service
      .getResumeTransactionSubCategory(category_group_id)
      .then(resp => {
        this.setDataChart(resp.result, this.properties.CHART.CATEGORYSUB);
      })
      .catch(err => {
        this.setDataChart([], this.properties.CHART.CATEGORYSUB);
        this.toastr.error("Não foi possível carregar o gráfico.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });

    this.service
      .getResumeTransactionGridSubCategoria(category_group_id)
      .then(resp => {
        this.gridOptions.columnDefs = this.columnDefs.COLUMNSDEF.CATEGORYSUB;
        this.gridOptions.rowData = resp.result;
        this.updateRowDataFooter(resp.result, "CATEGORYSUB");
      })
      .catch(err => {
        this.toastr.error("Não foi possível carregar seus dados.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });
  };

  public refreshResumeTransaction = () => {
    this.service
      .getResumeTransaction()
      .then(resp => {
        this.setDataChart(resp.result, this.properties.CHART.CATEGORY);
      })
      .catch(err => {
        this.setDataChart([], this.properties.CHART.CATEGORY);
        this.toastr.error("Não foi possível carregar o gráfico.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });

    this.service
      .getResumeTransactionGrid()
      .then(resp => {
        this.gridOptions.columnDefs = this.columnDefs.COLUMNSDEF.CATEGORY;
        this.gridOptions.rowData = resp.result;

        this.updateRowDataFooter(resp.result, "CATEGORY");
      })
      .catch(err => {
        this.toastr.error("Não foi possível carregar seus dados.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });
  };

  async setCharts() {
    this.options = this.configuration.getOptionsCharts();
    this.chart = chart(this.chartTarget.nativeElement, this.options);
  }

  public getOptions() {
    this.gridOptions = this.configuration.getOptionsGrid();
  }

  public setDataChart(chartData: any, properties: any) {
    const id = "main";
    const data = chartData.map((item: any): any => ({
      ...item,
      name: properties.name(item),
      x: item[properties.x],
      y: parseFloat(item[properties.y])
    }));
    const series = { id, data };
    if (chartData.length) this.isEmptyChart = true;
    if (this.chart.series.length > 0) this.chart.series[0].remove();
    this.chart.addSeries(series);
  }

  public updateRowDataFooter(footerRowData, type: string) {
    var vl_transaction_total = 0;
    footerRowData.map(data => {
      vl_transaction_total += parseFloat(data.vl_transaction);
    });

    var footer = new FooterGridTransaction(
      0,
      "Balanço",
      0,
      vl_transaction_total,
      "",
      { icon: "" },
      {}
    );
    this.pinnedTotalRow = [footer];
    if (this.gridOptions.api) {
      this.gridOptions.api.setPinnedBottomRowData([footer]);
    } else {
      this.gridOptions.pinnedBottomRowData = [footer];
    }
  }
}
