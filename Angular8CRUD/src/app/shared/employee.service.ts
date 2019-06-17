import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employeeList: Employee[];

  constructor(private http: HttpClient) { }

  postEmployee() {
    return this.http.post(environment.apiURL + '/Employee', this.selectedEmployee);
  }

  putEmployee() {
    return this.http.put(environment.apiURL + '/Employee/' + this.selectedEmployee.EmployeeID, this.selectedEmployee);
  }

  getEmployeeList() {
    this.http.get(environment.apiURL + 'Employee').toPromise()
    .then(x => {
      this.employeeList = x as Employee[];
    });
  }

  deleteEmployee(id) {
    return this.http.delete(environment.apiURL + 'Employee/' + id);
  }
}



