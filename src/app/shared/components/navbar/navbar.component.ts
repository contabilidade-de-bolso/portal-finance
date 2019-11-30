import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { MDBModalService, MDBModalRef } from "angular-bootstrap-md";
import { NewTransactionComponent } from "../new-transaction/new-transaction.component";
import { SessionStorage } from "../../services/session-storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  modalRef: MDBModalRef;
  @Input() list_nav_bar: ListNavBar;

  constructor(
    private modalService: MDBModalService,
    private sStorage: SessionStorage
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.modalRef = null;
  }

  logout() {
    this.sStorage.removeUserAuth();
    window.location.replace("/login");
  }

  openModalNewTransaction() {
    this.modalRef = this.modalService.show(NewTransactionComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: "modal-full-height modal-right",
      containerClass: "right",
      animated: true
    });
  }
}

export class ListNavBar {
  text: string;
  link?: string;
  active: string;
}
