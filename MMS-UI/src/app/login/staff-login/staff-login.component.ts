import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { StaffLogin } from 'src/app/models/staff-login';
import { MarksService } from 'src/app/services/marks.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent {
  loginDetails : StaffLogin = {
    id: 0,
    staffid: '',
    password: ''
  }

  passwordVisible: boolean = false;

  constructor(private router: Router, private httpService : MarksService, private tost : ToastrService) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
console.log(this.loginDetails);

    this.httpService.loginStaff(this.loginDetails).pipe(
      catchError(error => {
        if(error){
          this.tost.error("Invalid");
        }
        else if(this.loginDetails.staffid == "" || this.loginDetails.password == ""){
          this.tost.error("Username and password are required.", "Error");
        }
        else if(this.loginDetails.staffid != "" || this.loginDetails.password != ""){
          this.tost.error("Username or password is incorrect.", "Error");
        }
        return of(null);
      })
    ).subscribe((result: any) => {
      if (result) {
        localStorage.setItem("token",result.token);
        console.log(result.token);
        this.tost.success("Login Successful", "Success");
        this.router.navigateByUrl('/home');
      }
    });
  }

  navigateToStudentLogin(): void {
    this.router.navigate(['/student-login']);
  }
}
