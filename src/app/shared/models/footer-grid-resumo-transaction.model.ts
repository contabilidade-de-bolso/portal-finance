export class FooterGridTransaction {
  category_group_id: number;
  nm_transaction: string;
  dt_transaction: number;
  vl_transaction: number;
  cd_transaction_type: string;
  category_group: {
    nm_category_group: string;
    icon: string;
  };
  transaction_type: { nm_transaction_type: string };

  constructor(
    category_group_id: number,
    nm_transaction: string,
    dt_transaction: number,
    vl_transaction: number,
    cd_transaction_type: string,
    category_group: any,
    transaction_type: any
  ) {
    this.category_group_id = category_group_id;
    this.nm_transaction = nm_transaction;
    this.dt_transaction = dt_transaction;
    this.vl_transaction = vl_transaction;
    this.cd_transaction_type = cd_transaction_type;
    this.category_group = category_group;
    this.transaction_type = transaction_type;
  }
}
