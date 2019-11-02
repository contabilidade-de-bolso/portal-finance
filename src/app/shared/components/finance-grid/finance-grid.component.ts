import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  SimpleChanges
} from "@angular/core";
import { GridOptions, ColDef } from "ag-grid-community";

@Component({
  selector: "finance-grid",
  templateUrl: "./finance-grid.component.html",
  styleUrls: ["./finance-grid.component.css"]
})
export class FinanceGridComponent
  implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  @Input() width: string;
  @Input() height: string;
  @Input() fixHorizontalBar: boolean;
  @Input() gridOptions: GridOptions;
  @Input() columnDefs: Array<ColDef>;
  @Input() rowData: Array<Object>;
  @Input() frameworkComponents: any;

  @ViewChild("tabDiv") tabDiv: ElementRef;
  @ViewChild("gridDiv") gridDiv: ElementRef;

  public _offset: number;
  @Input("offset")
  public get offset(): number {
    return this._offset;
  }
  public set offset(v: number) {
    this._offset = v;
    this.resize(v);
  }

  public merged: boolean;
  public _gridClass: string;

  public ROW_HEIGHT: number = 36;

  constructor(
    private elRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {
    this.width = "100%";
    this.height = "100%";
    this.fixHorizontalBar = false;
    this.gridOptions = {};
    this.gridClass = "";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.hideHorizontalBar();
    this.resize(this.offset);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // aqui as opções padrão do grid devem ser configuradas
    if (changes.gridOptions && !this.merged) {
      if (!this.gridOptions.defaultColDef) {
        this.gridOptions.defaultColDef = {};
      }
      this.gridOptions.defaultColDef.floatingFilterComponentParams = {
        grid: this.gridOptions
      };
      this.gridOptions.enableColResize =
        changes.gridOptions.currentValue.enableColResize || false;
      this.gridOptions.defaultColDef.resizable =
        changes.gridOptions.currentValue.defaultColDef.resizable || true;
      this.gridOptions.enableFilter = false;
      this.gridOptions.suppressMovableColumns = true;
      this.gridOptions.rowHeight = !this.gridOptions.rowHeight
        ? this.ROW_HEIGHT
        : this.gridOptions.rowHeight;
      this.gridOptions.headerHeight = this.ROW_HEIGHT;
      this.gridOptions.suppressDragLeaveHidesColumns = true;
      this.gridOptions.localeText = {
        page: "Página",
        more: "Mais",
        to: "até",
        of: "de",
        next: '<i class="fa fa-play" aria-hidden="true"></i>',
        last: '<i class="fa fa-forward" aria-hidden="true"></i>',
        first: '<i class="fa fa-backward" aria-hidden="true"></i>',
        previous:
          '<i class="fa fa-play fa-flip-horizontal" aria-hidden="true"></i>',

        filterOoo: "Filtro...",
        applyFilter: "Aplicar",
        clearFilter: "Limpar Filtro",

        equals: "Igual a",
        lessThan: "Menor que",
        greaterThan: "Maior que",
        notEqual: "Diferente de",
        notContains: "Não contém",
        lessThanOrEqual: "Menor ou Igual a",
        greaterThanOrEqual: "Maior ou Igual a",
        inRange: "No intervalo",

        contains: "Contém",
        startsWith: "Iniciado com",
        endsWith: "Terminado com",
        noRowsToShow: " Não há dados."
      };

      this.gridOptions.overlayLoadingTemplate = `
              <div class="grind-loader">
                  <div class="rect1"></div>
                  <div class="rect2"></div>
                  <div class="rect3"></div>
                  <div class="rect4"></div>
                  <div class="rect5"></div>
              </div>
          `;
      this.merged = true;
    }
  }

  @Input()
  set gridClass(value: string) {
    // this._gridClass = `${this.assetGridService.theme} ${value}`.trim();
  }

  get gridClass(): string {
    return this._gridClass;
  }

  resize(offsetHeight: number = 0): void {
    this.gridDiv.nativeElement.style.height = `calc(100% - ${offsetHeight}px)`;
  }

  public hideHorizontalBar(): void {
    if (this.fixHorizontalBar) {
      const gridEls: HTMLCollectionOf<Element> = (this.elRef
        .nativeElement as Document).getElementsByClassName("ag-body-viewport");
      for (let i = 0, len: number = gridEls.length; i < len; ++i) {
        (gridEls[i] as HTMLElement).style.overflowX = "hidden";
      }
    }
  }

  ngOnDestroy(): void {
    this.changeDetector.detach();
  }
}
