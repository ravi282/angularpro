
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Test1Component} from './test1/test1.component'
import { Test2Component} from './test2/test2.component'
import { StaticComponent} from './static/static.component'

const routes: Routes = [
  {
    path: 'request',
    component: StaticComponent,
  },
  {
    path: 'request/test1',
    component: Test1Component,
  },
  {
    path: 'request/test2',
    component: Test2Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
