import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  user: any = {};
  valid:boolean=true;
  constructor(private router: Router, private api: UserService,private builder:FormBuilder){}
 
  loginUser() {
    var client = this.user.email;
    var password = this.user.password;
    
    this.api.login(client, password).subscribe((res : any) => {
        console.log("client connecté");
        console.log('res',res)
        localStorage.setItem('userData',res.token)
        this.api.setUser(res);
    localStorage.setItem('userData', JSON.stringify(res));
        //if(res.role == 'Admin'){
          this.router.navigate(['/dashboard']);
        // }else{
        //   this.router.navigate(['/project']);
        // }
        },
        (error: HttpErrorResponse) => {
        alert("invalid user");
        console.log(error); } )
      }



      login(f:any){

        this.api.loginn(f).subscribe(
          res=>{
                 this.valid=true;
                localStorage.setItem('token',res.token);
                this.router.navigate(['/dashboard']);
                },
                 err=>{
                  console.log("undefiend");
                  this.valid=false;;
                 }
        )
      console.log(f);
    }


}

