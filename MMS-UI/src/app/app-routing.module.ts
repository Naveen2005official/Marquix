import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { StudentLoginComponent } from './login/student-login/student-login.component';
import { StaffLoginComponent } from './login/staff-login/staff-login.component';

const routes: Routes = [
  { path: '', component: DetailsComponent },
  { path: 'add-student', component: AddStudentsComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'home', component: DetailsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'student-login', component: StudentLoginComponent},
  { path: 'staff-login', component: StaffLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
