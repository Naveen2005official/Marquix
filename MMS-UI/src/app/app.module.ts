import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoginNavbarComponent } from './login/login-navbar/login-navbar.component';
import { StaffLoginComponent } from './login/staff-login/staff-login.component';
import { StudentLoginComponent } from './login/student-login/student-login.component';
import { DescriptionComponent } from './login/description/description.component';
import { LoginNavbarStaffComponent } from './login/login-navbar-staff/login-navbar-staff.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HeaderNavComponent,
    AddStudentsComponent,
    EditStudentComponent,
    AboutComponent,
    LoginComponent,
    LoginNavbarComponent,
    StaffLoginComponent,
    StudentLoginComponent,
    DescriptionComponent,
    LoginNavbarStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right', // Customize the position
      preventDuplicates: true,
      progressBar: true // Add a progress bar
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
