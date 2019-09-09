import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import {StaticComponent} from './static/static.component'
import { MatToolbarModule, MatStepperModule, MatGridListModule } from '@angular/material';
import { StaticRoutingModule} from './static-routing.module';


@NgModule({
  declarations:
 [Test1Component,
  Test2Component,
  StaticComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatStepperModule,
    StaticRoutingModule,
    MatGridListModule
  ]
})
export class StaticModule { }
