import { Component, OnInit } from "@angular/core";
import { User } from "../model/user.model";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { SessionStorage } from "src/app/shared/services/session-storage.service";
import { UserService } from "src/app/shared/services/user.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  public resourceForm: FormGroup;
  public serverErrorMessages: string[] = null;
  public submittingForm: boolean = false;
  public user: User;

  constructor(
    private service: UserService,
    private sessionStorage: SessionStorage,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildResourceForm();
  }

  public buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group(
      {
        username: [
          null,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15)
          ]
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15)
          ]
        ],
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
          ]
        ],
        email: [null, [Validators.required, Validators.email]],
        ok_password: [null, [Validators.required]]
      },
      {
        validator: this.checkIfMatchingPasswords("password", "ok_password")
      }
    );
  }

  public checkIfMatchingPasswords(password, ok_password) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[ok_password];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  public createUser() {
    var user: User = this.resourceForm.value;
    this.service
      .create(user)
      .then(resp => {
        if (resp.success) {
          this.toastr.warning("Usuário cadastrado com successo.", "Parabéns", {
            timeOut: 5000,
            positionClass: "toast-bottom-right"
          });

          this.backHome();
        }
      })
      .catch(err => {
        if (err.status == 400)
          this.toastr.error(err.error.errormessage, err.status, {
            timeOut: 5000,
            positionClass: "toast-bottom-right"
          });
      });
  }

  public backHome() {
    let urls = this.route.snapshot.parent.url;
    var baseComponentPath: string = "";
    urls.forEach(url => {
      baseComponentPath += `/${url.path}`;
    });

    //redirect/reload component page
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() => this.router.navigate([baseComponentPath, ""]));
  }

  public submitForm() {
    this.createUser();
  }
}
