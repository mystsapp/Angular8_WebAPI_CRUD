import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public employeeService: EmployeeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
  }

  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
    console.log(emp);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure want to delete this record?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => {
          this.employeeService.getEmployeeList();
          this.toastr.warning('Delete Successfully', 'Employee Registration');
        },
        error => {
          this.toastr.error(error, 'Employee Registration');
        }

      );
    }
  }

}
