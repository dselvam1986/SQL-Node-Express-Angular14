import { Component, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEmployees().subscribe(
      (result) => {
        console.log(result);

        // result.forEach((data) => {
        //   data.birth_date = new Date(data.birth_date).toLocaleDateString(
        //     'en-US'
        //   );
        // });
        this.employees = result;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Retrieved Customer info. ');
      }
    );
  }
}
