// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TaskService {
//   private apiUrl = 'http://localhost:5278/api/admin';

//   constructor(private http: HttpClient) {}

//   getAllTasks(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/GetAllTask`);
//   }

//   createTask(task: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/CreateTask`, task);
//   }

//   updateTaskStatus(taskId: number, status: string): Observable<any> {
//     return this.http.put(`${this.apiUrl}/UpdateTaskStatus/${taskId}`, { status });
//   }
  

//   editTask(taskId: number, task: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/EditTask${taskId}`, task);
//   }

//   deleteTask(taskId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/DeleteTask${taskId}`);
//   }
//   // deleteTask(taskId: number) {
//   //   return this.http.delete(`http://localhost:5278/api/admin/DeleteTask/${taskId}`, { responseType: 'text' });
//   // }
  
//   getTaskById(taskId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/GetTaskById${taskId}`);
//   }

//   // getTaskById(taskId: number) {
//   //   return this.http.get<any>(`http://localhost:5278/api/admin/GetTaskById/${taskId}`);
//   // }
  
//   searchTasks(title?: string, status?: string, dueDate?: Date): Observable<any> {
//     let params = new HttpParams();
//     if (title) params = params.set('title', title);
//     if (status) params = params.set('status', status);
//     if (dueDate) params = params.set('dueDate', dueDate.toISOString());

//     return this.http.get(`${this.apiUrl}/SearchTask`, { params });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5278/api/admin';

  constructor(private http: HttpClient) {}

  // Fix API URL for fetching all tasks
  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllTasks`); // Fixed API name
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateTask`, task);
  }

  updateTaskStatus(taskId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateTaskStatus/${taskId}`, { status });
  }

  // // Fix missing `/` before taskId
  // editTask(taskId: number, task: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/EditTask/${taskId}`, task);
  // }

  editTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/EditTask/${taskId}`, task, { responseType: 'text' as 'json' });
  }
  


  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteTask/${taskId}`, { responseType: 'text' as 'json' });
  }
  

  getTaskById(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetTaskById/${taskId}`);
  }

  searchTasks(title?: string, status?: string, dueDate?: Date): Observable<any> {
    let params = new HttpParams();
    if (title) params = params.set('title', title);
    if (status) params = params.set('status', status);
    if (dueDate) params = params.set('dueDate', dueDate.toISOString());

    return this.http.get(`${this.apiUrl}/SearchTask`, { params });
  }
}
