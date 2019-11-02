import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  public static CATEGORY_API: string = "category";

  constructor(private httpService: HttpService) {}

  public listAllCategory(): Promise<any> {
    return this.httpService.callMethod(
      CategoryService.CATEGORY_API,
      "listAllCategory",
      {}
    );
  }

  public searchSubCategory(nm_category_group_sub: string): Promise<any> {
    return this.httpService.callMethod(
      CategoryService.CATEGORY_API,
      "searchSubCategory",
      { nm_category_group_sub }
    );
  }
}
