import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksDetails } from '../models/marks-details';
import { MarksService } from '../services/marks.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  newMarks : MarksDetails = {
    id: 0,
    name: '',
    rollno: 0,
    subjects: [''],
    cgpa: 0,
    percentage: 0
  }

  constructor(private marksService : MarksService, private router : Router, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const id = Number(params.get('id'));
        console.log('Route ID:', id);
        if (id) {
          this.marksService.getMarks(id).subscribe({
            next: (mark) => {
              this.newMarks = mark;
              console.log('Fetched Marks:', this.newMarks);
            },
            error: (err) => {
              console.error('Error fetching marks:', err);
            }
          });
        }
      }
    });
  }

  addSubject(): void {
    this.newMarks.subjects.push('');
  }
  saveStudent()
  {
    this.marksService.updateMarks(this.newMarks.id, this.newMarks).subscribe({
      next: (response) =>
      {
        this.router.navigate(['']);
      },
      error : (error) =>
      {
        console.log(error);
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
