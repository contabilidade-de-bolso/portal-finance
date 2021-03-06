import {Component, Injectable} from '@angular/core';
import {NgbDatepickerI18n, NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatePTParserFormatter } from './datapicker/NgbDatePTParserFormatter';

const I18N_VALUES = {
  'pt': {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'pt';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'ngbd-datepicker-i18n',
  providers: [I18n, 
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDatePTParserFormatter, useClass: NgbDateParserFormatter}
  ] // define custom NgbDatepickerI18n provider
})
export class NgbdDatepickerI18n {
  model: NgbDateStruct;
}