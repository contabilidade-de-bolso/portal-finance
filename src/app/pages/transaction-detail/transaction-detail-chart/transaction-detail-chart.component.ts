import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as Highcharts from "highcharts";
import { chart } from "highcharts";

import { TransactionDetailConfiguration } from "../transaction-detail-configuration";
import { TransactionDetailService } from "../transaction-detail.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "transaction-detail-chart",
  templateUrl: "./transaction-detail-chart.component.html",
  styleUrls: ["./transaction-detail-chart.component.css"]
})
export class TransactionDetailChartComponent implements OnInit {
  public options: Highcharts.Options;
  public chart: any;
  public highcharts = Highcharts;

  public cd_transaction_type: any;
  public properties: any;

  @ViewChild("chartTransactionDetail")
  public chartTransactionDetail: ElementRef;

  constructor(
    private configuration: TransactionDetailConfiguration,
    private service: TransactionDetailService,
    private toastr: ToastrService
  ) {
    this.properties = this.configuration.getPropertiesChart();
  }

  ngOnInit() {
    this.refreshTransactionDetail();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setCharts();
    });
  }

  async setCharts() {
    this.options = this.configuration.getOptionsCharts();
    this.chart = chart(this.chartTransactionDetail.nativeElement, this.options);
  }

  public refreshTransactionDetail() {
    this.service
      .getDetailCardChart(this.cd_transaction_type)
      .then(resp => {
        this.setDataChart(resp.result, this.properties.CHART.DETAILBYCATEGORY);
      })
      .catch(err => {
        this.setDataChart([], this.properties.CHART.DETAILBYCATEGORY);
        this.toastr.error("Não foi possível carregar o gráfico.", "Desculpe", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        console.log("err", err);
      });
  }

  public setDataChart(chartData: any, properties: any) {
    const series = properties.series(chartData);

    if (this.chart.series.length > 0) this.chart.series[0].remove();

    this.chart.xAxis[0].categories = properties.xAxis(chartData);
    series.map(serie => this.chart.addSeries(serie));
  }
}
