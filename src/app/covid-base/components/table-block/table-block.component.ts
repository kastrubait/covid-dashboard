import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IGlobal } from 'src/app/core/models/covid-base.models';

@Component({
  selector: 'app-table-block',
  templateUrl: './table-block.component.html',
  styleUrls: ['./table-block.component.scss']
})

export class TableBlockComponent implements OnInit, OnChanges {
  labels: string[] = ['Cases', 'Deaths', 'Recovered'];
  dataColumns: string[] = ['cases', 'deaths', 'recovered'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  displayColumns: string[] = [];
  displayData: any[] = [];
  inputData: any[] = [];
  
  @Input() globalData!: IGlobal;

  constructor() { }

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "globalData" changed
    if (changes['globalData'] && this.globalData) {
      //console.log('gl!', this.globalData);
      const globalData: ITableElement = {
        cases: this.globalData.cases,
        deaths: this.globalData.deaths,
        recovered: this.globalData.recovered
      };
      this.inputData = [globalData];
      //console.log(this.inputData);

      this.transpose();
      this.fillLabels();
    }
  } 

  // idea from https://stackblitz.com/edit/angular-cjskob?file=src%2Fapp%2Ftable.component.ts
  transpose() {
    let transposedData: any[] = [];
    for (let column = 0; column < this.dataColumns.length; column += 1) {
      transposedData[column] = {
        label: this.labels[column]
      };
      for (let row = 0; row < this.inputData.length; row += 1) {
        transposedData[column][`column${row}`] = this.inputData[row][this.dataColumns[column]];
      }
    }
    this.dataSource = new MatTableDataSource(transposedData);
  }

  fillLabels() {
    this.displayColumns = ['label'];
    for (let i = 0; i < this.inputData.length; i++) {
      this.displayColumns.push('column' + i);
    }
  }
}

export interface ITableElement {
  cases: number;
  deaths: number;
  recovered: number;
}
