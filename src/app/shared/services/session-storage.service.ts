import { Injectable } from "@angular/core";
import { User } from "src/app/pages/login/model/user.model";

@Injectable({
  providedIn: "root"
})
export class SessionStorage {
  constructor() {}

  setUser(user): void {
    sessionStorage.setItem("CLIENT_AUTH", JSON.stringify(user));
  }

  getUserAuth(): User {
    return JSON.parse(sessionStorage.getItem("CLIENT_AUTH"));
  }

  removeUserAuth() {
    sessionStorage.removeItem("CLIENT_AUTH");
  }
}
