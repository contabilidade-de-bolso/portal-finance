import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.css"]
})
export class PageHeaderComponent implements OnInit {
  @Input("page-title") pageTitle: string;
  @Input("title-class") titleClass: string;
  @Input("show-button") showButton: boolean = true;
  @Input("icon-show") iconShow: boolean = false;
  @Input("icon-class") iconClass: boolean = false;
  @Input("button-class") buttonClass: string;
  @Input("button-text") buttonText: string;
  @Input("button-link") buttonLink: string;
  @Input("placement-tooltip") placementTooltip: string;
  @Input("message-tooltip") messageTooltip: string;

  constructor() {}

  ngOnInit() {}
}
