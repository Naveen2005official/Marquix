import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { MarksDetails } from '../models/marks-details';
import { StudentLogin } from '../models/student-login';
import { StaffLogin } from '../models/staff-login';
@Injectable({
  providedIn: 'root'
})
export class MarksService {
  baseApiUrl: string = "https://localhost:7296/";
  constructor(private http: HttpClient) { }

  getAllMarks() : Observable<MarksDetails[]>
  {
    return this.http.get<MarksDetails[]>(this.baseApiUrl + 'api/Marks');
  }

  getMarks(id : number) : Observable<MarksDetails>
  {
    return this.http.get<MarksDetails>(this.baseApiUrl + 'api/Marks/' + id);
  }

  addMarks(newMarks : MarksDetails) : Observable<MarksDetails>
  {
    return this.http.post<MarksDetails>(this.baseApiUrl + 'api/Marks/' , newMarks);
  }

  updateMarks(id : number, newMarks : MarksDetails) : Observable<MarksDetails>
  {
    return this.http.put<MarksDetails>(this.baseApiUrl + 'api/Marks/' + id, newMarks );
  }

  deleteMarks(id : number) : Observable<MarksDetails>
  {
    return this.http.delete<MarksDetails>(this.baseApiUrl + 'api/Marks/' + id);
  }

  loginStudent(loginDetails: StudentLogin) : Observable<StudentLogin>
  {
    return this.http.post<StudentLogin>(this.baseApiUrl + 'api/Authentication/UserLogin', loginDetails);
  }

  loginStaff(loginDetails: StaffLogin) : Observable<StaffLogin>
  {
    return this.http.post<StaffLogin>(this.baseApiUrl + 'api/Authentication/StaffLogin', loginDetails);
  }
}
