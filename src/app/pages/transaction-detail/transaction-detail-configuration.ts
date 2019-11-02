import { Injectable } from "@angular/core";
import { ValueFormatterParams } from "ag-grid-community";
import * as moment from "moment";
import { DecimalPipe } from "@angular/common";
import { EventService } from "src/app/core/services/event.service";
import { colors } from "src/app/shared/constants/color-default";
import { MessageSimpleComponent } from "src/app/shared/components/tooltip-custom/message-simple/message-simple.component";

@Injectable({
  providedIn: "root"
})
export class TransactionDetailConfiguration {
  private decimalPipe: DecimalPipe = new DecimalPipe("pt-BR");

  constructor(private eventService: EventService) {}

  getFrameworkComponents() {
    return {
      FRAMEWORKCOMPONENTS: {
        CATEGORY: { MessageSimpleTooltip: MessageSimpleComponent }
      }
    };
  }
  getColumnsDefs() {
    return {
      COLUMNSDEF: {
        CATEGORY: [
          {
            headerName: "",
            field: "",
            cellClass: ["text-center"],
            headerClass: "text-center",
            width: 60,
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
            headerName: "Nome",
            field: "nm_transaction",
            cellClass: ["text-left"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Categoria",
            field: "category_group.nm_category_group",
            cellClass: ["text-left"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Sub Categoria",
            field: "category_group.nm_category_group",
            cellClass: ["text-left"],
            headerClass: "text-center",
            sortable: true
          },
          {
            headerName: "Data",
            field: "dt_transaction",
            cellClass: ["text-center"],
            headerClass: "text-center",
            sortable: true,
            valueFormatter: (param: ValueFormatterParams) => {
              if (!param.value) return "-";
              return moment(param.value, "YYYYMMDD").format("DD/MM/YY");
            }
          },
          {
            headerName: "Valor R$",
            field: "vl_transaction",
            cellClass: ["text-right"],
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
            }
          },
          {
            headerName: "",
            field: "pending",
            cellClass: ["text-right"],
            headerClass: "text-center",
            sortable: false,
            width: 60,
            cellRenderer: param => {
              if (param.value) return '<i class="icon fas fa-check"></i>';
              return "";
            },
            tooltipValueGetter: function(params) {
              return { value: "Pendente" };
            }
          },
          {
            headerName: "",
            field: "pending",
            cellClass: ["text-right"],
            headerClass: "text-center",
            sortable: false,
            width: 60,
            cellRenderer: param => {
              return '<i class="icon fas fa-pencil-alt"></i>';
            },
            tooltipValueGetter: function(params) {
              return { value: "Editar" };
            }
          },
          {
            headerName: "",
            field: "pending",
            cellClass: ["text-right"],
            headerClass: "text-center",
            sortable: false,
            width: 60,
            cellRenderer: param => {
              return '<i class="icon fas fa-trash-alt"></i>';
            },
            tooltipComponent: "MessageSimpleTooltip",
            tooltipValueGetter: () => {
              return { value: "Excluir" };
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
            }
          }
        ]
      }
    };
  }

  getPropertiesChart() {
    return {
      CHART: {
        DETAILBYCATEGORY: {
          xAxis: data => data.CATEGORIES.map(item => item),
          series: data => {
            const PENDING = data.PENDING.map(item => item.vl_transaction);
            const NOT_PENDING = data.NOT_PENDING.map(
              item => item.vl_transaction
            );
            const BALANCE = data.BALANCE.map(item => item.vl_transaction);
            return [
              { id: "PENDING", data: PENDING, name: "Pendentes" },
              { id: "NOT_PENDING", data: NOT_PENDING, name: "Pagos" },
              { id: "BALANCE", data: BALANCE, name: "Balanço" }
            ];
          }
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
        type: "column",
        height: 500
      },
      colors: colors.graph["SAL"],
      title: {
        text: "Categorias"
      },
      xAxis: {
        categories: ["", "", "", "", "", ""]
      },
      yAxis: {
        min: 0
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: "percent"
        }
      }
    };
  }
}
