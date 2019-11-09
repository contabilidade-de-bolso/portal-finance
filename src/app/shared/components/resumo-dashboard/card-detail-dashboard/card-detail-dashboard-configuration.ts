import { Injectable } from "@angular/core";
import { colors } from "src/app/shared/constants/color-default";
import { DecimalPipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class CardDetailDashboardConfiguration {
  public decimalPipe: DecimalPipe = new DecimalPipe("pt-BR");

  public getOptionsCharts(color: string = "DEFAULT"): any {
    let self = this;
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        width: 150,
        height: 123
      },
      title: {
        text: "",
        y: 60
      },
      colors: colors.graph[color],
      tooltip: {
        shared: true,
        headerFormat: "",
        formatter: function() {
          return `
            <span style="color:${this.point.color}">\u25CF</span>
            <b>${this.point.options.name}</b><br/>
            R$ <b>${self.decimalPipe.transform(
              this.point.options.y,
              "1.2-2"
            )}</b><br/>`;
        }
      },
      plotOptions: {
        pie: {
          size: "260%",
          dataLabels: {
            enabled: false
          },
          startAngle: -90,
          endAngle: 90,
          center: ["50%", "75%"]
        }
      },
      series: {
        type: "pie",
        name: "detail-dashboard",
        innerSize: "50%",
        states: { inactive: { opacity: 1 } },
        data: []
      }
    };
  }
}
