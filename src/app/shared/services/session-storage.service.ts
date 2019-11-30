import { Injectable } from "@angular/core";
import { User } from "src/app/pages/login/model/user.model";

@Injectable({
  providedIn: "root"
})
export class SessionStorage {
  constructor() {}

  setUser(user): void {
    localStorage.setItem("CLIENT_AUTH", JSON.stringify(user));
  }

  getUserAuth(): User {
    return JSON.parse(localStorage.getItem("CLIENT_AUTH"));
  }

  removeUserAuth() {
    localStorage.removeItem("CLIENT_AUTH");
  }
}
