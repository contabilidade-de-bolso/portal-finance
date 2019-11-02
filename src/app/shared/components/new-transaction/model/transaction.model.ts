export class TransactionModel {
  constructor(
    public id: number,
    public nm_transaction: string,
    public vl_transaction: number,
    public dt_transaction: number,
    public ds_transaction: string,
    public category_group_sub_id: number,
    public category_group_id: number,
    public cd_transaction_type: number
  ) {}
}
