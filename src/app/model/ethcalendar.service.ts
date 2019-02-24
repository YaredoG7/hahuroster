import {Injectable} from "@angular/core"; 
import {
    NgbDatepickerI18n,
    NgbDateStruct
  } from '@ng-bootstrap/ng-bootstrap';
  

// const WEEKDAYS  = ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሓሙስ", "ዓርብ", "ቅዳሜ"];

const WEEKDAYS  = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሓሙ", "ዓር", "ቅዳ"]; 
const MONTHS  = ["መስከረም", "ጥቅምት", "ኅዳር", "ታህሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ",  "ጳጉሜ"];

@Injectable()
export class NgbDatepickerI18nEth extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number) { return WEEKDAYS[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}