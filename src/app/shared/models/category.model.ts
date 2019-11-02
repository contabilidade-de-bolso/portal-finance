export class Category {
  id_core_category_group: number;
  cd_category_group: string;
  nm_category_group: string;
  category_group_sub: Array<any>;

  constructor(
    id_core_category_group: number,
    cd_category_group: string,
    nm_category_group: string,
    category_group_sub: Array<any>
  ) {
    this.id_core_category_group = id_core_category_group;
    this.cd_category_group = cd_category_group;
    this.nm_category_group = nm_category_group;
    this.category_group_sub = category_group_sub;
  }
}
