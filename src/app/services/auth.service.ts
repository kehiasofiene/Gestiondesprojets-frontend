import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../model/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<User> {

  constructor(private authService:UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.getuserr();
  }
}
