import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";
import { TransactionModel } from "../model/transaction.model";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  public static TRANSACTION_API: string = "transaction";

  constructor(private httpService: HttpService) {}

  public insertTransaction(transaction: TransactionModel): Promise<any> {
    return this.httpService.callMethod(
      TransactionService.TRANSACTION_API,
      "insertTransaction",
      transaction
    );
  }
}
