import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-GT';
registerLocaleData(localeEs);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [Tab2Page],
  providers:[
    { provide: LOCALE_ID, useValue: 'es-GT' }
  ]
})
export class Tab2PageModule {}
