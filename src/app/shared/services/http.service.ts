import { URL_API_BASE } from "src/app/app.api";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, debounceTime } from "rxjs/operators";
import { Injectable, OnInit } from "@angular/core";
import { SessionStorage } from "./session-storage.service";
import { UtilService } from "../utils/util.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private localStorage: SessionStorage,
    private utilService: UtilService
  ) {}

  public callMethod(
    url: string,
    method: string,
    body?: any,
    not_auth: boolean = true
  ): Promise<any> {
    return this.resolvePromise(url, body, method, not_auth);
  }

  private resolvePromise(
    url: string,
    body: any,
    method?: string,
    not_auth: boolean = true
  ): Promise<{
    result: any;
    success: boolean;
    errorcode: string;
    errormesssage: string;
  }> {
    var params = {};
    url = `${URL_API_BASE.LOCAL}/${url}/${method}`;
    if (not_auth) {
      params = {
        Authorization: `Bearer ${this.localStorage.getUserAuth().token}`
      };
      var currentDate = this.localStorage.getPeriodCurrent();
      currentDate = !currentDate ? 0 : currentDate.dt_transaction;
      if (body) {
        body["currentDate"] = this.utilService.formatDateSqlToNgb(currentDate);
      } else {
        body = {
          currentDate: this.utilService.formatDateSqlToNgb(currentDate)
        };
      }
    }

    var headers = new HttpHeaders(params);
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append(
      "Access-Control-Allow-Methods",
      "DELETE, POST, GET, OPTIONS"
    );
    headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, DateCurrent"
    );

    return new Promise<any>((resolve: any, reject: any) => {
      this.http
        .post<any>(url, body, { headers })
        .pipe(
          map(
            (response: Response): Response => {
              return resolve(response);
            }
          ),
          catchError(
            (response: Response): Observable<Response> => throwError(response)
          ),
          debounceTime(500)
        )
        .subscribe((response: any): void => {
          resolve(response);
        }, reject);
    });
  }
}

export class OptionalParam {
  name: string;
  value: string;
}
