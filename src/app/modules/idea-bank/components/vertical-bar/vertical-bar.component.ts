import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.css']
})
export class VerticalBarComponent implements OnInit {
  @Input("single") single: any[] = [];

  view: [number, number] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Entidades';
  showYAxisLabel = true;
  yAxisLabel = 'Avance';


  constructor() { }

  ngOnInit() {
  }
  onSelect(event: any) {
    console.log(event);
  }
}
