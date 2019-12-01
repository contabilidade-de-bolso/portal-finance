import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { SessionStorage } from "../../services/session-storage.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public initName = "";
  public fullName = "";

  @Input() public list_nav_bar: ListNavBar;

  constructor(
    private modalService: NgbModal,
    private sStorage: SessionStorage
  ) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.CLIENT_AUTH);
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
}

export class ListNavBar {
  text: string;
  link?: string;
  active: string;
}
