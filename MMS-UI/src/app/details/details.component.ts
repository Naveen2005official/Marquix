import { Component } from '@angular/core';
import { MarksDetails } from '../models/marks-details';
import { MarksService } from '../services/marks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  marks : MarksDetails[] = [];
  constructor(private marksService : MarksService, private router : Router) { }

  ngOnInit() : void
  {
    this.marksService.getAllMarks().subscribe({
      next:(marks) => {
        this.marks = marks;
      },
      error : (response) => {
        console.log(response);
      }
    });
  }

  deleteStudent(id : number)
  {
    this.marksService.deleteMarks(id).subscribe({
      next:(response) =>
      {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/' , { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        })
      }
    })
  }

}
