import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/Project';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseURL = "http://localhost:9090/Project";
  private baseurl1="http://localhost:9090/User";
  constructor(private http: HttpClient) { }

  getprojects():Observable<Project[]>{
      return this.http.get<Project[]>(this.baseURL);
  }

  addProject(data:any){
    return this.http.post<Project>(this.baseURL,data);
  }

  projectusers(projectId:number):Observable<User[]>{
    return this.http.get<User[]>('http://localhost:9090/User/projectusers/'+projectId);
  }


  getUserPhoneNumberFromProject(project: Project): Observable<string> {
    const url = 'http://localhost:9090/Project/userphone';
    return this.http.post<string>(url, project);
  }

  UpdateProject( project: Project): Observable<Project>{
    const url = `${this.baseURL}/update`;
    return this.http.put<Project>(url,project);
  }

  deleteProject(id:number){
    return this.http.delete<Project>(`${this.baseURL}/${id}`);
  }

  
}
