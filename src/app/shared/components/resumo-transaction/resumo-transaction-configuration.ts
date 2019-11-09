import { Injectable } from "@angular/core";
import { ValueFormatterParams } from "ag-grid-community";
import * as moment from "moment";
import { DecimalPipe } from "@angular/common";
import { colors } from "../../constants/color-default";
import { EventService } from "src/app/core/services/event.service";

@Injectable({
  providedIn: "root"
})
export class ResumoTransactionConfiguration {
  private decimalPipe: DecimalPipe = new DecimalPipe("pt-BR");

  constructor(private eventService: EventService) {}

  getColumnsDefs() {
    return {
      COLUMNSDEF: {
        CATEGORY: [
          {
            headerName: "",
            field: "",
            cellClass: ["text-center", "pointer"],
            headerClass: "text-center",
            width: 60,
            cellRenderer: params => {
              return (
                '<span class="rag-element">' +
                '<i class="' +
                (params.data.category_group.icon || "") +
                '"></i>' +
                "</span>"
              );
            }
          },
          {
            headerName: "Nome",
            field: "nm_transaction",
            cellClass: ["text-left", "pointer"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Categoria",
            field: "category_group.nm_category_group",
            cellClass: ["text-left", "pointer"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Dt Transação",
            field: "dt_transaction",
            cellClass: ["text-center", "pointer"],
            headerClass: "text-center",
            sortable: true,
            valueFormatter: (param: ValueFormatterParams) => {
              if (!param.value) return "-";
              return moment(param.value, "YYYYMMDD").format("DD/MM/YY");
            }
          },
          {
            headerName: "Vl. Transação",
            field: "vl_transaction",
            cellClass: ["text-right", "pointer"],
            headerClass: "text-center",
            sortable: true,
            cellClassRules: {
              "text-success bold": function(params) {
                return params.data.cd_transaction_type == "ENT";
              },
              "text-danger": function(params) {
                return params.data.cd_transaction_type == "SAI";
              }
            },
            cellRenderer: params => {
              return (
                '<span class="rag-element"> R$ ' +
                this.decimalPipe.transform(params.value, "1.2-2") +
                "</span>"
              );
            },
            pinnedRowCellRenderer: params => {
              var classElemnt =
                parseFloat(params.data.vl_transaction) >= 0
                  ? "text-success bold"
                  : "text-danger";
              return `<span class="rag-element ${classElemnt}"> R$ 
                ${this.decimalPipe.transform(params.value, "1.2-2")}
                </span>`;
            }
          }
        ],
        CATEGORYSUB: [
          {
            headerName: "",
            field: "",
            cellClass: ["text-center", "pointer"],
            headerClass: "text-center",
            width: 40,
            cellRenderer: params => {
              return (
                '<span class="rag-element">' +
                '<i class="' +
                params.data.category_group.icon +
                '"></i>' +
                "</span>"
              );
            }
          },
          {
            headerName: "",
            field: "nm_transaction",
            cellClass: ["text-left", "pointer"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Sub Categoria",
            field: "category_group_sub.nm_category_group_sub",
            cellClass: ["text-left", "pointer"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Dt da transação",
            field: "dt_transaction",
            cellClass: ["text-center", "pointer"],
            headerClass: "text-center",
            sortable: true,
            valueFormatter: (param: ValueFormatterParams) => {
              if (!param.value) return "-";
              return moment(param.value, "YYYYMMDD").format("DD/MM/YY");
            }
          },
          {
            headerName: "Vl. transação",
            field: "vl_transaction",
            cellClass: ["text-right", "pointer"],
            headerClass: "text-center",
            sortable: true,
            cellClassRules: {
              "text-success bold": function(params) {
                return params.data.cd_transaction_type == "ENT";
              },
              "text-danger": function(params) {
                return params.data.cd_transaction_type == "SAI";
              }
            },
            cellRenderer: params => {
              params.value =
                params.data.cd_transaction_type == "ENT"
                  ? params.value
                  : params.value * -1;

              return (
                '<span class="rag-element"> R$ ' +
                this.decimalPipe.transform(params.value, "1.2-2") +
                "</span>"
              );
            },
            pinnedRowCellRenderer: params => {
              var classElemnt =
                parseFloat(params.data.vl_transaction) >= 0
                  ? "text-success bold"
                  : "text-danger";
              return `<span class="rag-element ${classElemnt}"> R$ 
                ${this.decimalPipe.transform(params.value, "1.2-2")}
                </span>`;
            }
          }
        ]
      }
    };
  }

  getPropertiesChart() {
    return {
      CHART: {
        CATEGORY: {
          name: params => {
            return params.category_group.nm_category_group;
          },
          x: "category_group_id",
          y: "vl_transaction"
        },
        CATEGORYSUB: {
          name: params => {
            return params.nm_transaction;
          },
          x: "category_group_id",
          y: "vl_transaction"
        }
      }
    };
  }

  getOptionsGrid(columnDefs?: []): any {
    return {
      defaultColDef: {
        sortable: true
      },
      columnDefs,
      suppressHorizontalScroll: true,
      sortingOrder: ["asc", "desc"],
      onGridReady: params => {
        params.api.sizeColumnsToFit();
      },
      animateRows: true,
      rowData: [],
      getRowStyle: params => {
        if (params.node.rowIndex % 2 === 0) {
          return { background: "ag-row-even" };
        } else {
          return { background: "ag-row-odd" };
        }
      },
      onGridSizeChanged: params => {
        params.api.sizeColumnsToFit();
      },
      onRowDataChanged: params => {
        params.api.sizeColumnsToFit();
      },
      onCellClicked: (event): void => {
        this.eventService.dispatch(
          "REFRESH_RESUME_TRANSACTION_CATEGORY",
          event.data
        );
      }
    };
  }

  getOptionsCharts(): any {
    return {
      chart: {
        type: "pie"
      },
      title: {
        text: ""
      },
      plotOptions: {
        pie: {
          size: 350,
          center: ["50%", "50%"],
          cursor: "pointer",
          dataLabels: {
            formatter: function() {
              if (this.point.percentage < 7.5) return "";
              return this.point.name;
            },

            useHTML: true,
            enabled: true,
            distance: -50,
            borderWidth: 0,
            style: {
              color: "#FFF",
              textOutline: "0",
              fontWeight: null
            }
          },

          events: {
            click: event => {
              this.eventService.dispatch(
                "REFRESH_RESUME_TRANSACTION_CATEGORY",
                event.point
              );
            }
          },

          animation: {
            duration: 700
          }
        }
      },
      colors: colors.graph.DEFAULT,
      tooltip: {
        shared: true,
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          "Valor da Transação: R$ <b>{point.y}</b><br/>"
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "10%",
          zMin: 0,
          name: "gastos",
          data: []
        }
      ]
    };
  }
}
