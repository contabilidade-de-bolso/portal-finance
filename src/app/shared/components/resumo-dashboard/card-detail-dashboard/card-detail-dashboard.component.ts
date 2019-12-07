import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import * as Highcharts from "highcharts";
import { CardDetailDashboardConfiguration } from "./card-detail-dashboard-configuration";

@Component({
  selector: "card-detail-dashboard",
  templateUrl: "./card-detail-dashboard.component.html",
  styleUrls: ["./card-detail-dashboard.component.css"]
})
export class CardDetailDashboardComponent implements OnInit {
  public options: Highcharts.Options;
  public chart: any;
  public highcharts = Highcharts;
  public isEmptyChart: boolean = false;

  @Input() detail;
  @ViewChild("chartCardDetail") public chartCardDetail: ElementRef;

  constructor(private configuration: CardDetailDashboardConfiguration) {}

  ngAfterViewInit(): void {
    this.chart = Highcharts.chart(
      "container" + this.detail.id,
      this.configuration.getOptionsCharts(this.detail.id)
    );

    this.refreshResumeTransaction(this.detail.graph);
  }

  ngOnInit() {}

  public refreshResumeTransaction = data => {
    this.setDataChart(data);
  };

  public setDataChart = (chartData: any) => {
    const series = {
      id: "main",
      type: "pie",
      name: "detail-dashboard",
      innerSize: "50%",
      states: { inactive: { opacity: 1 } },
      data: chartData
    };

    this.isEmptyChart = chartData.length ? false : true;
    if (this.chart.series.length > 0) this.chart.series[0].remove();
    this.chart.addSeries(series);
  };
}
