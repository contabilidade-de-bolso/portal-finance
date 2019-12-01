import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NewJourneyService implements CanActivate {
  public static NEW_JOURNEY_API: string = "newjourney";

  constructor(private httpService: HttpService) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    var { result, success } = await this.checkTransaction();
    if (!result) {
      window.location.replace("/new-journey");
    } else if (success) return true;
    else {
      window.location.replace("/home");
      return false;
    }
  }

  public checkTransaction(): Promise<any> {
    return this.httpService.callMethod(
      NewJourneyService.NEW_JOURNEY_API,
      "checkTransaction",
      {}
    );
  }
}
