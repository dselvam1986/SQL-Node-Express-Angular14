import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Customer } from '../interface/customer';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [DecimalPipe],
})
export class CustomersComponent implements OnInit {
  customer: Customer[] = [];
  //Observable
  customerOb: Observable<Customer[]> = new Observable<Customer[]>();

  filter = new FormControl('', { nonNullable: true });

  constructor(private api: ApiService, private pipe: DecimalPipe) {
    this.customerOb = this.filter.valueChanges.pipe(
      startWith(''),
      map((term: string) => {
        return this.search(term, pipe);
      })
    );
  }

  ngOnInit(): void {
    this.api.getCustomer().subscribe(
      (result) => {
        console.log(result);
        this.customer = result;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Retrieved Customer info. ');
      }
    );
  }

  search(text: string, pipe: PipeTransform): Customer[] {
    return this.customer.filter((cust) => {
      let str = text.toLowerCase();
      return (
        cust.first_name.toLowerCase().includes(str) ||
        cust.last_name.toLowerCase().includes(str) ||
        cust.address.toLowerCase().includes(str) ||
        cust.city.toLowerCase().includes(str) ||
        cust.state.toLowerCase().includes(str) ||
        pipe.transform(cust.points).includes(str)
      );
    });
  }
}
