import { Component, OnInit } from "@angular/core";
import { ListNavBar } from "src/app/shared/components/navbar/navbar.component";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit {
  list_nav_bar: Array<ListNavBar> = [
    { text: "Resumo", link: "/", active: "active" },
    { text: "Transações", link: "/transacao", active: "" }
  ];

  constructor() {}

  ngOnInit() {}
}
