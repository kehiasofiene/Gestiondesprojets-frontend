import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/User';
import { saveAs } from 'file-saver';
import jwt_decode from 'jwt-decode';
import { authenticationRespose } from '../model/authenticationRespose';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:9090/api/v1/auth/register';
  private baseURL='http://localhost:9090/User';

  private user!:User;

  constructor( private http: HttpClient){ }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/setimage/{iduser}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  postRegistration(register:User,dept_id:number){
    return this.http.post<User>("http://localhost:9090/api/v1/auth/register/"+dept_id,register);
  }

  getusers():Observable<User[]>{
  return this.http.get<User[]>("http://localhost:9090/User");
  }

  getimage(user_id:number){
    return this.http.get("http://localhost:9090/User/image"+user_id);
  }

  login(email: string, password: string) : Observable<any> {
    return this.http.post('http://localhost:9090/api/v1/auth/authenticate', { email, password });
  }

  loginn(log:any){
    let user:User;
    this.http.get<User>('http://localhost:9090/api/v1/auth/userConnected/'+log.email).subscribe(
      res=>{user=res
      this.setUser(user);
      localStorage.setItem('userData', JSON.stringify(user));
    });
      return this.http.post<authenticationRespose>('http://localhost:9090/api/v1/auth/authenticate',log);
    }

    validEmail(email:any){
      let headers=new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem('token')}`)
      return this.http.get<boolean>(this.baseUrl+'api/v1/auth/emailvalid/'+email,{headers});
     }
    
  getToken(): string|null {
    return localStorage.getItem('token');
  }

  checkLoginStatus(): void {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn.next(true);
      console.log('connecté')
    }
  }

  getCurrentClient(): Observable<User|null> {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as { sub: string, exp: string };
      const email = decodedToken.sub;
      return this.getUserByEmail(email);
    }
    return of(null);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/v1/auth/email?email=${email}`);
  }


  logout(){
    let headers=new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem('token')}`)
    localStorage.removeItem('token');
    return this.http.get('http://localhost:9090/logout',{headers});}

    
  setimage(file:File,user_id:number){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post("http://localhost:9090/User/setimage/"+user_id,formData);
  }
  
  uploadImage(id:any,formData:any){
    let headers=new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem('token')}`)
   return  this.http.post(this.baseUrl+`api/v1/user/uploadImage/${id}`, formData,{headers});
   } 

  getuser(id:number):Observable<User>{
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }
  
  updateuser(updatedUserData: any,idupdate:number){
     return this.http.put<User>(`${this.baseURL}/${idupdate}`,updatedUserData);
  }

  deleteuser(id:number){
    return this.http.delete("http://localhost:9090/User/"+id);
  }

  getuserr():User{
    return this.user;
  }

  setUser(data:User){
    this.user=data;
  }

  userconnected():any{
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
     return JSON.parse(userDataString);
    }
  }
}
