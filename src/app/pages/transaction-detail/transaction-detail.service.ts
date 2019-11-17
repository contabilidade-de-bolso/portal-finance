import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class TransactionDetailService {
  public static TRANSACTION_DETAIL_API: string = "resume/transactionDetail";

  constructor(private httpService: HttpService) {}

  public getTransactionDetailGrid(): Promise<any> {
    return this.httpService.callMethod(
      TransactionDetailService.TRANSACTION_DETAIL_API,
      "getTransactionDetailGrid",
      {}
    );
  }

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

  public updateTransactionPending(id: string): Promise<any> {
    return this.httpService.callMethod(
      TransactionDetailService.TRANSACTION_DETAIL_API,
      "updateTransactionPending",
      { id }
    );
  }

  public deleteTransaction(id: string): Promise<any> {
    return this.httpService.callMethod(
      TransactionDetailService.TRANSACTION_DETAIL_API,
      "deleteTransaction",
      { id }
    );
  }
}
