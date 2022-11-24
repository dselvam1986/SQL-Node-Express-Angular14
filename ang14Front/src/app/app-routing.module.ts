import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: 'customer', component: CustomersComponent },
  { path: 'employee', component: EmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
