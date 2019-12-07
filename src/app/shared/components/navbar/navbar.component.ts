import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { SessionStorage } from "../../services/session-storage.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { UtilService } from "../../utils/util.service";
import { EventService } from "src/app/core/services/event.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public currentPeriod = "";
  public initName = "";
  public fullName = "";
  public dtTransactionCurrent = 0;

  @Input() public list_nav_bar: ListNavBar;
  @Input() public showPeriod: Boolean = true;

  constructor(
    private modalService: NgbModal,
    private sStorage: SessionStorage,
    private utilService: UtilService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.CLIENT_AUTH);
    this.parameterPeriodInit();

    this.initName = user.name.substring(0, 1).toLocaleUpperCase();
    this.fullName = user.name;

    window.addEventListener("storage", function(e) {
      if (e["key"] == "CLIENT_AUTH" && !e["newValue"]) {
        window.location.replace("/login");
      }
    });
  }

  logout() {
    this.sStorage.removeUserAuth();
    window.location.replace("/login");
  }

  openModalNewTransaction() {
    const modalRef = this.modalService.open(NewTransactionComponent, {
      backdrop: "static",
      keyboard: true
    });

    modalRef.componentInstance.params = { action: "NEW" };
  }

  parameterPeriodInit() {
    const firstTransaction = this.sStorage.getPeriodCurrent();
    if (!firstTransaction) return;

    this.dtTransactionCurrent = firstTransaction.dt_transaction;
    const ft = this.utilService.formatDateSqlToNgb(this.dtTransactionCurrent);

    this.currentPeriod = format(
      new Date(ft.year, ft.month - 1, ft.day),
      "MMMM yyyy",
      { locale: pt }
    );
  }

  changePeriod(type: string = "NEXT" || "PREVIOUS") {
    const ft = this.utilService.formatDateSqlToNgb(this.dtTransactionCurrent);
    var newDate = this.dtTransactionCurrent;

    const periodoF = {
      NEXT: ft => format(new Date(ft.year, ft.month, ft.day), "yyyyMMdd"),
      PREV: ft => format(new Date(ft.year, ft.month - 2, ft.day), "yyyyMMdd")
    };

    newDate = periodoF[type](ft);

    this.sStorage.setPeriodCurrent({ dt_transaction: newDate });
    this.dtTransactionCurrent = newDate;

    const newCurrentDate = this.utilService.formatDateSqlToNgb(
      this.dtTransactionCurrent
    );
    this.currentPeriod = format(
      new Date(
        newCurrentDate.year,
        newCurrentDate.month - 1,
        newCurrentDate.day
      ),
      "MMMM yyyy",
      { locale: pt }
    );

    this.eventService.dispatch("REFRESH_TRANSACTION_DETAIL_CARD", true);
    this.eventService.dispatch("REFRESH_RESUME_TRANSACTION", { success: true });
  }
}

export class ListNavBar {
  text: string;
  link?: string;
  active: string;
}
