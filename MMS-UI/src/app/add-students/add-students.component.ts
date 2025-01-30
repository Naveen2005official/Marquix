import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MarksDetails } from '../models/marks-details';
import { MarksService } from '../services/marks.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent {
  newMarks : MarksDetails = {
    id: 0,
    name: '',
    rollno: 0,
    subjects : [''],
    cgpa: 0,
    percentage: 0
  }

  constructor(private marksService : MarksService, private router : Router)
  {

  }
  addSubject(): void {
    this.newMarks.subjects.push('');
  }

  saveStudent()
  {
    this.marksService.addMarks(this.newMarks).subscribe({
      next: (product) =>
      {
        this.router.navigate(['']);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
  onSubjectChange(i: number): void {
    console.log(`Subject ${i} changed to: ${this.newMarks.subjects[i]}`);
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }

}
