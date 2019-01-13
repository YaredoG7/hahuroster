import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    //   $('#datetimepicker').datetimepicker({
    //     locale: {
    // 		     	calender: 'ethiopian',
    // 				lang: 'en'
    // 			}
    // });
  }
}
