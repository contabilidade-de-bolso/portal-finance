import { Component, OnInit, Injector } from "@angular/core";
import { BaseResourceFormComponent } from "src/app/shared/components/base-resource-form/base-resource-form.component";
import { User } from "../model/user.model";
import { AuthenticateService } from "../service/authenticate.service";
import { Validators } from "@angular/forms";
import { SessionStorage } from "src/app/shared/services/session-storage.service";

@Component({
  selector: "app-login-auth",
  templateUrl: "./login-auth.component.html",
  styleUrls: ["./login-auth.component.css"]
})
export class LoginAuthComponent extends BaseResourceFormComponent<User> {
  public logoutMessage: string = "";

  constructor(
    protected injector: Injector,
    protected service: AuthenticateService,
    public localStorage: SessionStorage
  ) {
    super(injector, new User(), service, localStorage);
  }

  ngOnInit() {
    const reasonLogout = JSON.parse(
      this.route.snapshot.queryParamMap.get("logout")
    );

    if (reasonLogout) {
      this.logoutMessage = reasonLogout.message;
    }

    this.localStorage.removeUserAuth();

    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
    this.setDm();
  }

  buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
      ]
    });
  }

  submitForm() {
    this.submittingForm = true;
    this.authenticate();
  }

  async authenticate() {
    const user: User = this.resourceForm.value;

    const response = await this.service.authenticate(user);

    this.submittingForm = false;
    if (!response.success) {
      this.toastr.error(response.message, response.errocode);
      return;
    }

    const { result } = response;
    let userAuth = {};
    userAuth = result.user;
    userAuth["token"] = result.token;
    this.localStorage.setUser(userAuth);
    this.router.navigate(["/home"]);
  }
}
