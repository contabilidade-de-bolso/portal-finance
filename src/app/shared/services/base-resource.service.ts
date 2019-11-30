import { BaseResourceModel } from "../models/base-resource.model";
import { Injector, OnInit } from "@angular/core";
import { Observable, throwError, from } from "rxjs";

import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, CanActivate } from "@angular/router";

import { URL_API_BASE } from "src/app/app.api";
import { SessionStorage } from "./session-storage.service";

export abstract class BaseResourceService<T extends BaseResourceModel>
  implements CanActivate, OnInit {
  constructor(
    protected URL_COMPLEMENT: string,
    protected injector: Injector,
    protected localStorage: SessionStorage
  ) {
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
  }

  protected URL_PATH = URL_API_BASE["LOCAL"];
  protected http: HttpClient;
  protected router: Router;
  protected headers: HttpHeaders;

  ngOnInit() {
    this.headers = new HttpHeaders({
      Authorization: "Bearer " + this.localStorage.getUserAuth().token
    });
  }

  getAll(): Observable<T[]> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}/list/`;

    return this.http.post(url, {}, { headers: this.headers }).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getAllPagination(params: any): Observable<T[]> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}/pagination/`;

    return this.http.post(url, params, { headers: this.headers }).pipe(
      (response: any) => {
        return response;
      },
      catchError(this.handleError)
    );
  }

  getById(params: any): Observable<T> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}/list/`;

    return this.http.post(url, params, { headers: this.headers }).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}`;

    console.log(">>>>", url);
    return this.http.post(url, resource, { headers: this.headers }).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(params: any): Observable<T> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}/update/`;

    return this.http.post(url, params, { headers: this.headers }).pipe(
      map(() => params),
      catchError(this.handleError)
    );
  }

  delete(params: any): Observable<any> {
    this.canActivate();
    const url = `${this.URL_PATH}/${this.URL_COMPLEMENT}/delete/`;

    return this.http
      .post(url, params, {
        headers: this.headers
      })
      .pipe(
        map(() => null),
        catchError(this.handleError)
      );
  }

  canActivate(): boolean {
    var user = this.localStorage.getUserAuth();
    if (!user) {
      localStorage.clear();
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }

  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    return jsonData;
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData;
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
