import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbChatModule,
  NbIconModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbInputModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ExtraComponentsRoutingModule } from './entrees-routing.module';

// components
import { ExtraComponentsComponent } from './entrees.component';
import { SpinnerInTabsComponent } from './spinner/spinner-in-tabs/spinner-in-tabs.component';
import { SpinnerInButtonsComponent } from './spinner/spinner-in-buttons/spinner-in-buttons.component';
import { SpinnerSizesComponent } from './spinner/spinner-sizes/spinner-sizes.component';
import { SpinnerColorComponent } from './spinner/spinner-color/spinner-color.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {
  InteractiveProgressBarComponent,
} from './progress-bar/interactive-progress-bar/interactive-progress-bar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AlertComponent } from './alert/alert.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { NebularFormInputsComponent } from './form-inputs/nebular-form-inputs.component';
import { NebularSelectComponent } from './form-inputs/nebular-select/nebular-select.component';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit.component';
import { CalendarKitMonthCellComponent } from './calendar-kit/month-cell/month-cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  ExtraComponentsComponent,
  AlertComponent,
  ProgressBarComponent,
  InteractiveProgressBarComponent,
  SpinnerComponent,
  SpinnerColorComponent,
  SpinnerSizesComponent,
  SpinnerInButtonsComponent,
  SpinnerInTabsComponent,
  CalendarComponent,
  DayCellComponent,
  ChatComponent,
  NebularFormInputsComponent,
  NebularSelectComponent,
  CalendarKitFullCalendarShowcaseComponent,
  CalendarKitMonthCellComponent,
];

const MODULES = [

  NbAlertModule,
  NbActionsModule,
  NbButtonModule,
  NbCalendarModule,
  NbCalendarKitModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbChatModule,
  NbIconModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  ThemeModule,
  NbInputModule,
  ExtraComponentsRoutingModule,

  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class ExtraComponentsModule { }
