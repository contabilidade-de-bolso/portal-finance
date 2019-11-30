import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";
import { SessionStorage } from "./session-storage.service";

@Injectable({
  providedIn: "root"
})
export class SessionUserService implements CanActivate {
  public static SESSION_USER_API: string = "session";

  constructor(
    private httpService: HttpService,
    private sStorage: SessionStorage
  ) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.sStorage.getUserAuth();
    if (!user) return false;

    let resp = await this.checkSession();
    if (resp.success) return true;

    this.sStorage.removeUserAuth();
    window.location.replace("/login?logout=" + JSON.stringify(resp));

    setTimeout(() => {
      return false;
    }, 300);
  }

  public checkSession(): Promise<any> {
    return this.httpService.callMethod(
      SessionUserService.SESSION_USER_API,
      "checkSession",
      {}
    );
  }
}
