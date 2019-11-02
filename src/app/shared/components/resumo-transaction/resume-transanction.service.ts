import { Injectable } from "@angular/core";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class ResumeTransactionService {
  public static TRANSACTION_API: string = "resume/transaction";

  constructor(private httpService: HttpService) {}

  public getResumeTransaction(): Promise<any> {
    return this.httpService.callMethod(
      ResumeTransactionService.TRANSACTION_API,
      "getResumeTransaction"
    );
  }

  public getResumeTransactionGrid(): Promise<any> {
    return this.httpService.callMethod(
      ResumeTransactionService.TRANSACTION_API,
      "getResumeTransactionGrid"
    );
  }
  public getResumeTransactionSubCategory(
    category_group_id: number
  ): Promise<any> {
    return this.httpService.callMethod(
      ResumeTransactionService.TRANSACTION_API,
      "getResumeTransactionSubCategory",
      { category_group_id }
    );
  }

  public getResumeTransactionGridSubCategoria(
    category_group_id: number
  ): Promise<any> {
    return this.httpService.callMethod(
      ResumeTransactionService.TRANSACTION_API,
      "getResumeTransactionGridSubCategoria",
      { category_group_id }
    );
  }
}
