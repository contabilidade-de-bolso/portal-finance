import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class ResumeDashboardService {
  public static TRANSACTION_API: string = "resume/transaction";

  constructor(private httpService: HttpService) {}

  public getDetailDashboard(): Promise<any> {
    return this.httpService.callMethod(
      ResumeDashboardService.TRANSACTION_API,
      "getDetailDashboard"
    );
  }
}
