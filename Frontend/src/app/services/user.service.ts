import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5278/api/user';

  constructor(private http: HttpClient) {}

  // getAssignedTasks(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/ViewTaskStatus`);
  // }

  getAssignedTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ViewTaskStatus`);
  }
  



  updateTaskStatus(taskId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateTaskStatus/${taskId}`, `"${status}"`, { 
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }
  
  

}