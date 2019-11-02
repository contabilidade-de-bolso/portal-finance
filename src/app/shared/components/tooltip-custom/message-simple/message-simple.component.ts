import { Component, OnInit } from "@angular/core";
import { ITooltipAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-message-simple",
  templateUrl: "./message-simple.component.html",
  styleUrls: ["./message-simple.component.css"]
})
export class MessageSimpleComponent implements ITooltipAngularComp {
  private params: any;
  private valueToDisplay: string;

  agInit(params): void {
    console.log("params", params);
    this.params = params;
    this.valueToDisplay = this.params.value.value;
  }
}
