import { Injectable, Injector } from "@angular/core";
import { User } from "src/app/pages/login/model/user.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public static USER_API: string = "user";

  constructor(private httpService: HttpService) {}

  public create(user: User): Promise<any> {
    return this.httpService.callMethod(
      UserService.USER_API,
      "create",
      user,
      false
    );
  }
}
