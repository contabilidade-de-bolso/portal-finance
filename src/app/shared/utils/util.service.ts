import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor() {}

  formatDateSqlNgb(date, format): string {
    return moment(
      `${date.year}-${date.month}-${date.day}`,
      "YYYY-M-D",
      true
    ).format(format);
  }

  formatDateSqlToNgb(date): any {
    var newDate = date ? String(date) : "";
    return {
      year: parseInt(newDate.substr(0, 4)),
      month: parseInt(newDate.substr(4, 2)),
      day: parseInt(newDate.substr(6, 2))
    };
  }
}
