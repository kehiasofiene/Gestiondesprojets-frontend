import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task_status } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL = "http://localhost:9090/Task";
  constructor(private http: HttpClient) { }

  getTasksByStatus(taskStatus: Task_status): Observable<Task[]> {
    const url = `${this.baseURL}/Task/${taskStatus}`;
    return this.http.get<Task[]>(url);
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:9090/Task/Tasks/'+projectId);
  }

}
