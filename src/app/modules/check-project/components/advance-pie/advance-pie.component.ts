import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advance-pie',
  templateUrl: './advance-pie.component.html',
  styleUrls: ['./advance-pie.component.css']
})
export class AdvancePieComponent implements OnInit {
  @Input("single") single: any[] = [];

  view: [number, number] = [600, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;



  constructor() { }

  ngOnInit() {
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
