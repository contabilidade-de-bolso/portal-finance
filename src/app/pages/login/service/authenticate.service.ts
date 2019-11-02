import { Injectable, Injector } from "@angular/core";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { User } from "../model/user.model";
import { SessionStorage } from "src/app/shared/services/session-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticateService extends BaseResourceService<User> {
  constructor(
    protected injector: Injector,
    protected sessionSorage: SessionStorage
  ) {
    super("session", injector, sessionSorage);
  }

  authenticate(user: User): any {
    let URL = `${this.URL_PATH}/${this.URL_COMPLEMENT}/auth`;

    return this.http
      .post(URL, user)
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((e: any) => {
        e.error.success = false;
        return e.error;
      });
  }
}
