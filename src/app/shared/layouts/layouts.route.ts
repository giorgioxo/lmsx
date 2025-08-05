import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';
import { CalendarComponent } from '../../features/calendar/calendar.component';
import { TablesComponent } from '../../features/tables/tables.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutsComponent,

    children: [
      {
        path: 'dashboard',
        data: { title: 'Dashboard' },
        component: DashboardComponent,
        children: [
          {
            path: 'tables',
            data: { title: 'Tables' },
            component: TablesComponent,
          },
        ],
      },
      {
        path: 'calendar',
        data: { title: 'Calendar' },
        component: CalendarComponent,
      },
    ],
  },
];
