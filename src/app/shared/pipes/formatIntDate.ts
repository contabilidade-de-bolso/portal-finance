import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "formatIntDate" })
export class FormatIntDatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value) {
    if (!value) {
      return "";
    }
    value = value.toString();
    return (
      value.substring(6, 8) +
      "/" +
      value.substring(4, 6) +
      "/" +
      value.substring(0, 4)
    );
  }
}
