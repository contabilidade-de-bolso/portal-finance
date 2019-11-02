import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class User extends BaseResourceModel{

    constructor(
        public name?:string,
        public username?:string,
        public password?:string,
        public email?:string,
        public token?:string
    ){
        super();
    }
}