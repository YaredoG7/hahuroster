import { Component} from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'አይነት አንድ'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'አይነት ሁለት'}
  ];

  public doughnutChartLabels = ['ሩብ ዓመት 1', 'ሩብ ዓመት 2', 'ሩብ ዓመት 3', 'ሩብ ዓመት 4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public radarChartLabels = ['ሩብ ዓ-1', 'ሩብ ዓ-2', 'ሩብ ዓ-3', 'ሩብ ዓ-4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';


  public pieChartLabels = ['ሩብ ዓመት 1', 'ሩብ ዓመት 2', 'ሩብ ዓመት 3', 'ሩብ ዓመት 4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
}
