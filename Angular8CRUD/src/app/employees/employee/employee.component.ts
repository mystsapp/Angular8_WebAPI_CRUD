import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: '',
    };
  }

  onSubmit(form: NgForm) {
    if (this.employeeService.selectedEmployee.EmployeeID == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
}

  insertRecord(form: NgForm) {
    this.employeeService.postEmployee().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('New Record Added Successfully', 'Employee Register');
        this.employeeService.getEmployeeList();
      },
      error => {
       this.toastr.error(error, 'Employee Register');
      }
    );
  }

  updateRecord(form: NgForm) {
    this.employeeService.putEmployee().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('New Record Updated Succesfully', 'Employee Register');
        this.employeeService.getEmployeeList();
      },
      error => {
        this.toastr.error(error, 'Employee Register');
      }
    )
  }

}
