import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class TransactionDetailService {
  public static TRANSACTION_DETAIL_API: string = "resume/transactionDetail";

  constructor(private httpService: HttpService) {}

  public getDetailCard(cd_transaction_type: string): Promise<any> {
    return this.httpService.callMethod(
      TransactionDetailService.TRANSACTION_DETAIL_API,
      "getDetailCard",
      { cd_transaction_type }
    );
  }

  public getDetailCardChart(cd_transaction_type: string): Promise<any> {
    return this.httpService.callMethod(
      TransactionDetailService.TRANSACTION_DETAIL_API,
      "getDetailCardChart",
      { cd_transaction_type }
    );
  }
}
