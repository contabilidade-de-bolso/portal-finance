import { OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseResourceService } from "../../services/base-resource.service";
import { BaseResourceModel } from "../../models/base-resource.model";
import { switchMap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { SessionStorage } from "../../services/session-storage.service";
import { User } from "src/app/pages/login/model/user.model";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected toastr: ToastrService;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  protected user: User;

  constructor(
    protected injector,
    public resource: T,
    protected service: BaseResourceService<T>,
    protected sessionStorage: SessionStorage
  ) {
    this.toastr = this.injector.get(ToastrService);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.user = this.sessionStorage.getUserAuth();

    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
    this.setDm();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") this.createResource();
    // currentAction == "edit"
    else this.updateResource();
  }

  protected getParams(params) {
    if (this.user) params["id_user"] = this.user.id_user;
    return params;
  }

  protected setCurrentAction() {
    if (!this.route.snapshot.url.length) return;

    if (this.route.snapshot.url[0].path == "new") this.currentAction = "new";
    else this.currentAction = "edit";
  }

  protected loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap
        .pipe(
          switchMap(elem => {
            var params = {};
            params = this.getParams(params);
            return this.service.getById(params);
          })
        )
        .subscribe(
          (resources: any) => {
            var [resource] = resources;
            this.resource = resource;
            this.resourceForm.patchValue(resource); // binds loaded resource data to resourceForm
          },
          error =>
            this.toastr.error("Ocorreu um erro no servidor, tente mais tarde.")
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == "new" || this.currentAction == undefined)
      this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected setDm() {
    console.log("Nenhuma DM inserida.");
  }

  protected creationPageTitle(): string {
    return "Novo";
  }

  protected editionPageTitle(): string {
    return "Edição";
  }

  protected createResource() {
    var resource: T = this.resourceForm.value;
    resource = this.getParams(resource);

    this.service
      .create(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
  }

  protected updateResource() {
    var resource: T = this.resourceForm.value;
    resource = this.getParams(resource);

    this.service
      .update(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
  }

  protected actionsForSuccess(resource: T) {
    this.submittingForm = false;
    this.toastr.success("Solicitação processada com successo!");

    if (!this.route.snapshot.parent.url.length) return;

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

  protected actionsForError(error) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;

    if (error.status)
      this.serverErrorMessages = [
        `${error.error.error} - ${error.error.message}`
      ];
    else
      this.serverErrorMessages = [
        "Falha na comunicação com o servidor. Por favor, tente mais tarde."
      ];
  }

  protected authenticated(): boolean {
    let user = this.sessionStorage.getUserAuth();

    if (user != null) this.user = user;
    else if (!this.user) {
      this.router.navigate(["/"]);
      this.sessionStorage.removeUserAuth();
    }

    return this.user !== undefined && this.user !== null;
  }

  protected format(date: any): string {
    // return moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D', true).format();
    return "  ";
  }

  protected abstract buildResourceForm(): void;
}
