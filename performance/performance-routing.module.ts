import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformanceComponent } from './performance.component';
import { DesignComponent } from './design/design.component';

const routes: Routes = [{
  path: '',
  component: PerformanceComponent,
  children: [{
    path: 'design',
    component: DesignComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceRoutingModule { }
