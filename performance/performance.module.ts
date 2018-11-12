import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DesignModule } from './design/design.module';
import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceComponent } from './performance.component';
import { DesignComponent } from './design/design.component';
import { DesignConfigComponent } from './design/designconfig/designconfig.component';

const components = [
  PerformanceComponent,
  DesignComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PerformanceRoutingModule,
    DesignModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [DesignConfigComponent

  ],
})
export class PerformanceModule { }
