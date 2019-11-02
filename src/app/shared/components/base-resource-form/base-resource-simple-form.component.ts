import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';



export abstract class BaseResourceSimpleFormComponent implements OnInit {

    resourceForm: FormGroup;
    submittingForm: boolean = false;
    
    constructor(){
    }

    ngOnInit() {}

    protected abstract submitForm(): void;
    protected abstract buildResourceForm(): void;

}
