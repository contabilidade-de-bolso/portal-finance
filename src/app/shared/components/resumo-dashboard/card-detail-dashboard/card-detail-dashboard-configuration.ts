import { Injectable } from "@angular/core";
import { colors } from "src/app/shared/constants/color-default";

@Injectable({
  providedIn: "root"
})
export class CardDetailDashboardConfiguration {
  public getOptionsCharts(color: string = "DEFAULT"): any {
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
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          "Valor da Transação: R$ <b>{point.y}</b><br/>"
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
