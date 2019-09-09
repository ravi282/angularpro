
import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { LandingService } from '../landing.service';

export interface FinalTableInterface {
  [key: string]: any;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  
  panelOpenState: boolean = false;
  allExpandState = true;
  form: FormGroup;
  disable= true;
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
  constructor
    (private formBuilder: FormBuilder,
      private Service: LandingService,
      private http: HttpClient
    ) {
    this.form = this.formBuilder.group({
      rows: new FormArray([], this.minSelectedCheckboxes(1)),
      columns: new FormArray([], this.minOneAnswer.bind(this)),
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


  columnSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(rowControl => rowControl.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return (totalSelected >= min || totalSelected == 1) ? null : { required: true };
    };
    return validator;
  }

  submit() {
    console.log(this.form.value);
    this.form.value.aggregators;
    this.form.value.rows;
    this.form.value.columns;
    this.form.value.filters;
    for (let i = 0; i <= this.form.value.aggregators.length; i++) {
      if (this.form.value.aggregators[i] == true)
        this.section4.push(this.aggregators[i].name);
    }
    for (let i = 0; i <= this.form.value.filters.length; i++) {
      if (this.form.value.filters[i] == true)
        this.section3.push(this.filters[i].name);
    }
    for (let i = 0; i <= this.form.value.columns.length; i++) {
      if (this.form.value.columns[i] == true)
        this.section2.push(this.columns[i].name);
    }
    const answerFormArray = this.form.get('columns') as FormArray;
    answerFormArray.controls.forEach((item) => {
      if (!item.value) item.enable()
    })
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
        this.headers = response['data']['headers'];
        this.finalresult = response['data']['data1'];
        const Table_DATA: FinalTableInterface[] = this.finalresult;
        console.log(this.finalresult)
        this.dataSource = Table_DATA;
      }
    )
  }
  get answers(): FormArray {
    return this.form.get('columns') as FormArray;
  };
  minOneAnswer(control) {
    return this.numChecked === 0 ? { minOneAnswerChecked: true } : null;
  }
  disableOther(checked: boolean) {
    checked ? this.numChecked++ : this.numChecked--;
    const answerFormArray = this.form.get('columns') as FormArray;
    this.columns.forEach(x => {
      if (this.numChecked == 1) {
        answerFormArray.controls.forEach((item) => {
          if (!item.value) item.disable()
        })
      } else {
        answerFormArray.controls.forEach((item) => {
          if (!item.value) item.enable()
        })
      }
    })
    console.log(this.columns);
  }


  //export the result
  exportAsXLSX(): void {
    this.Service.exportAsExcelFile(this.finalresult, 'sample');
  }

}


