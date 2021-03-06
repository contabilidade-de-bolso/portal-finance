import { Component, OnInit } from "@angular/core";
import { ListNavBar } from "src/app/shared/components/navbar/navbar.component";

@Component({
  selector: "transaction-detail",
  templateUrl: "./transaction-detail.component.html",
  styleUrls: ["./transaction-detail.component.css"]
})
export class TransactionDetailComponent implements OnInit {
  list_nav_bar: Array<ListNavBar> = [
    { text: "Resumo", link: "/home", active: "" },
    { text: "Transações", link: "/transacao", active: "active" }
  ];

  constructor() {}

  ngOnInit() {}
}
