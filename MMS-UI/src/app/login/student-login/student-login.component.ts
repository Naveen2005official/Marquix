import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { StudentLogin } from 'src/app/models/student-login';
import { MarksService } from 'src/app/services/marks.service';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  loginDetails : StudentLogin = {
    id: 0,
    studentid: '',
    password: ''
  }
  passwordVisible: boolean = false;

  constructor(private router: Router, private httpService: MarksService, private tost: ToastrService) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    // Add your login logic here
    console.log(this.loginDetails);

    this.httpService.loginStudent(this.loginDetails).pipe(
      catchError(error => {
        if(error){
          this.tost.error("Invalid");
        }
        else if(this.loginDetails.studentid == "" || this.loginDetails.password == ""){
          this.tost.error("Username and password are required.", "Error");
        }
        else if(this.loginDetails.studentid != "" || this.loginDetails.password != ""){
          this.tost.error("Username or password is incorrect.", "Error");
        }
        return of(null);
      })
    ).subscribe((result: any) => {
      if (result) {
        localStorage.setItem("token",result.token);
        this.tost.success("Login Successful", "Success");
        this.router.navigateByUrl('/home');
      }
    });
  }

  navigateToStaffLogin(): void {
    this.router.navigate(['/staff-login']);
  }

}
