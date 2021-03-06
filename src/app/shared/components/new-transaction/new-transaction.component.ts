import { Component, OnInit, Input } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseResourceSimpleFormComponent } from "../base-resource-form/base-resource-simple-form.component";
import * as moment from "moment";
import { TransactionModel } from "./model/transaction.model";
import { UtilService } from "../../utils/util.service";
import { TransactionService } from "./services/transaction.service";
import { ToastrService } from "ngx-toastr";
import { EventService } from "src/app/core/services/event.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-new-transaction",
  templateUrl: "./new-transaction.component.html",
  styleUrls: ["./new-transaction.component.css"]
})
export class NewTransactionComponent extends BaseResourceSimpleFormComponent
  implements OnInit {
  @Input() params: any;
  public showCategories: boolean = false;
  public categories: Array<Category> = [];
  public subCategorySelected;

  constructor(
    public modalRef: NgbActiveModal,
    private eventService: EventService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.listAllCategory();
    this.buildResourceForm();

    if (this.params.data) this.setValueForm();
  }

  setValueForm = () => {
    var newData = {
      ...this.params.data,
      dt_transaction: this.utilService.formatDateSqlToNgb(
        this.params.data.dt_transaction
      )
    };

    this.subCategorySelected = this.params.data.category_group_sub;
    this.resourceForm.patchValue(newData);
  };

  buildResourceForm(): void {
    const dateInitial = this.dateInitial();
    this.resourceForm = this.fb.group({
      nm_transaction: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
      ],
      vl_transaction: [null, [Validators.required]],
      dt_transaction: [dateInitial, [Validators.required]],
      ds_transaction: [null, [Validators.maxLength(50)]],
      cd_transaction_type: ["", Validators.required]
    });
  }

  public submitForm() {
    let transaction: TransactionModel = this.resourceForm.value;
    const dt_transaction = parseInt(
      this.utilService.formatDateSqlNgb(transaction.dt_transaction, "YYYYMMDD")
    );
    transaction.dt_transaction = dt_transaction;
    transaction.category_group_id = this.subCategorySelected.category_group_id;
    transaction.category_group_sub_id = this.subCategorySelected.id;

    this.params.action == "NEW"
      ? this.insertTransaction(transaction)
      : this.updateTransaction(transaction);

    this.resetForm();
    this.modalRef.close();
  }

  public resetForm() {
    this.resourceForm.reset();
    this.resourceForm.controls["dt_transaction"].patchValue(this.dateInitial());
    this.resourceForm.controls["cd_transaction_type"].patchValue("ENT");
    this.subCategorySelected = null;
  }

  public dateInitial() {
    const date = moment(new Date())
      .format("YYYY-MM-DD")
      .split("-");

    return {
      year: parseInt(date[0]),
      month: parseInt(date[1]),
      day: parseInt(date[2])
    };
  }

  public updateTransaction(transaction: TransactionModel) {
    transaction.id = this.params.id;
    this.transactionService
      .updateTransaction(transaction)
      .then(resp => {
        if (resp.success) {
          this.toastr.success(
            "Sua operação foi salva com successo.",
            "Parabéns",
            {
              timeOut: 5000,
              positionClass: "toast-bottom-left"
            }
          );

          this.eventService.dispatch("REFRESH_TRANSACTION_DETAIL_CARD", true);
          this.eventService.dispatch("REFRESH_RESUME_TRANSACTION", {
            success: true
          });
        }
      })
      .catch(err => {
        if (err.status == 400)
          this.toastr.error(err.error.errormessage, "Atenção", {
            timeOut: 5000,
            positionClass: "toast-bottom-left"
          });

        console.error(err);
      });
  }

  public insertTransaction(transaction: TransactionModel) {
    this.transactionService
      .insertTransaction(transaction)
      .then(resp => {
        if (resp.success) {
          this.toastr.success(
            "Sua transação foi cadastrada com successo.",
            "Parabéns",
            {
              timeOut: 5000,
              positionClass: "toast-bottom-left"
            }
          );

          this.eventService.dispatch("REFRESH_TRANSACTION_DETAIL_CARD", true);
          this.eventService.dispatch("REFRESH_RESUME_TRANSACTION", {
            success: true
          });
        }
      })
      .catch(err => {
        if (err.status == 400)
          this.toastr.error(err.error.errormessage, "Atenção", {
            timeOut: 5000,
            positionClass: "toast-bottom-left"
          });

        console.error(err);
      });
  }

  showOptionsCategories() {
    this.listAllCategory();
    this.showCategories = !this.showCategories;
  }

  listAllCategory() {
    this.categoryService
      .listAllCategory()
      .then(resp => {
        let { result } = resp;
        this.categories = result;
      })
      .catch(err => {
        console.error(err);
        this.toastr.error(
          "Ocorreu um erro ao carregar as categorias",
          "Desculpe",
          {
            timeOut: 5000,
            positionClass: "toast-bottom-right"
          }
        );
      });
  }

  selectCategory(subCategory) {
    this.showOptionsCategories();
    this.subCategorySelected = subCategory;
  }

  searchSubCategory(text: string) {
    if (!text) {
      this.listAllCategory();
      return;
    }

    this.categoryService.searchSubCategory(text).then(resp => {
      let category = new Category(0, "PES", "Pesquisa", []);
      let { result } = resp;

      result.map(item => {
        item.category_group_sub.map(sub => {
          category.category_group_sub.push(sub);
        });
      });

      this.categories = [category];
    });
  }

  closedModal = () => {
    this.modalRef.close();
  };
}
