import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../interface/customer';
import { Employee } from '../interface/employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customers: Customer[] = [];

  constructor(private http: HttpClient) {}

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://127.0.0.1:5000/api/store');
  }

  /** Employees table */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://127.0.0.1:5000/api/people');
  }
}
