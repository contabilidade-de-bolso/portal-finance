import { Injectable } from '@angular/core';
import * as moment from 'moment'
    
@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(){}

  formatDateSqlNgb(date, format):string{
    return moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D', true).format(format);
  }


}