import { Component, ViewChild, AfterViewInit,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { LandingService } from 'src/app/landing-page/landing.service';
import * as XLSX from 'xlsx'

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
export interface FinalTableInterface {
  [key: string]: any;
}
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent{

  isTableProcess = false;
  panelOpenState: boolean = false;
  allExpandState = true;
  form: FormGroup;
  disable= true;
  selectedColumnValue:any;
  selectedAggValue:any;
  rows = [];
  columns = [];
  filters = [];
  aggregators = [];
  section1 = [];
  section2 = [];
  section3 = [];
  section4 = [];
  finalpostObj = {};
  headers: any;
  finalresult: any;
  dataSource: any;
  numChecked: number = 0;
  aggnumChecked: number = 0;
  //@ViewChild(MatSort) sort: MatSort;
  sort:any;
  constructor
    (private formBuilder: FormBuilder,
      private Service: LandingService,
      private http: HttpClient
    ) {
    this.form = this.formBuilder.group({
      rows: new FormArray([], this.minSelectedCheckboxes(1)),
      columns: new FormArray([], this.minSelectedCheckboxes(0)),
      filters: new FormArray([], this.minSelectedCheckboxes(0)),
      aggregators: new FormArray([], this.minSelectedCheckboxes(1))
    });
    this.rows = this.getRows();
    this.columns = this.getColumns();
    this.filters = this.getFilters();
    this.aggregators = this.getAggrigetors();
  }

  getRows() {
    this.Service.getInfo().subscribe(
      (response) => {
        this.rows = response['data'].section1;
        this.rows.map((r, i) => {
          const rowControl = new FormControl(i === -1);
          (this.form.controls.rows as FormArray).push(rowControl);
        });
      }
    )
    return this.rows;
  }
  getColumns() {
    this.Service.getInfo().subscribe(
      (response) => {
        this.columns = response['data'].section2;
        this.columns.map((c, j) => {
          const columnControl = new FormControl(j === -1);
          (this.form.controls.columns as FormArray).push(columnControl);
          //debugger
        });
      }
    )
    return this.columns;

  }
  getFilters() {
    this.Service.getInfo().subscribe(
      (response) => {
        this.filters = response['data'].section3;
        this.filters.map((f, k) => {
          const filterControl = new FormControl(k === -1);
          (this.form.controls.filters as FormArray).push(filterControl);
        });
      }
    )
    return this.filters;
  }
  getAggrigetors() {
    this.Service.getInfo().subscribe(
      (response) => {
        this.aggregators = response['data'].section4;
        this.aggregators.map((a, l) => {
          const aggControl = new FormControl(l === -1);
          (this.form.controls.aggregators as FormArray).push(aggControl);
        });
      }
    )
    return this.aggregators;
  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(rowControl => rowControl.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }


  columnSelected(column) {
    const colFormArray = this.form.get('columns') as FormArray;
    let col=0;
    console.log(colFormArray);
    colFormArray.controls.forEach((colitem,col) => {
           if(colitem.value){
            colitem.enable();
             this.columns[col].checked="true";
             this.section2.push(this.columns[col].name);
           }
           else{
            colitem.disable();
             this.columns[col].checked="false";
           }
           col++;
       })
 console.log(this.columns);
 const colFormArray1 = this.form.get('columns') as FormArray;
}
  aggregatorsCheckbox(aggregator) {
      const aggFormArray = this.form.get('aggregators') as FormArray;
      let agg=0;
      console.log(aggFormArray);
      aggFormArray.controls.forEach((aggitem,agg) => {
             if(aggitem.value){
              aggitem.enable();
               this.aggregators[agg].checked="true";
               this.section4.push(this.aggregators[agg].name);
             }
             else{
              aggitem.disable();
               this.aggregators[agg].checked="false";
             }
             agg++;
         })
   console.log(this.aggregators);
  }

  submit() {
    this.isTableProcess=true;
    console.log(this.form.value);
    this.form.value.aggregators;
    this.form.value.rows;
    this.form.value.columns;
    this.form.value.filters;
console.log(this.form.value.rows);
    for (let i = 0; i <= this.form.value.rows.length; i++) {
      if (this.form.value.rows[i] == true)
        this.section1.push(this.rows[i].name);
    }
   
    this.finalpostObj = {
      'section1': this.section1,
      'section2': this.section2,
      'section3': this.section3,
      'section4': this.section4
    }
    this.postInfo();
  }
  postInfo() {
    this.Service.saveInfo(this.finalpostObj).subscribe(
      (response) => {
        this.isTableProcess=false;
        this.headers = response['data']['headers'];
        this.finalresult = response['data']['data1'];
        const Table_DATA: FinalTableInterface[] = this.finalresult;
        console.log(this.finalresult)
        this.dataSource = new MatTableDataSource(Table_DATA);
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  //export the result
  exportAsXLSX(): void {
    this.Service.exportAsExcelFile(this.finalresult, 'sample');
  }
}