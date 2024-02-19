import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { Project } from './model/Project';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import { RegistrationListComponent } from './auth/user/registration-list/registration-list.component';
import { UserDetailComponent } from './auth/user/user-detail/user-detail.component';
import { TodoComponent } from './task/todo/todo.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectuserComponent } from './project/projectuser/projectuser.component';
import { TasksprojectComponent } from './project/tasksproject/tasksproject.component';
import { AuthResolver } from './services/auth.service';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register/:department',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'project',component:ProjectlistComponent},
  {path:'listusers',component:RegistrationListComponent},
  {path:'detail/:id',component:UserDetailComponent},
  {path:'update/:id',component:RegisterComponent},
  {path:'todo',component:TodoComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'dashboard',component:DashboardComponent,resolve:{userData: AuthResolver}},
  {path:'navbar',component: HeaderComponent, resolve:{userData: AuthResolver}},
  {path:'projectusers/:id',component:ProjectuserComponent},
  {path:'taskproject/:id',component:TasksprojectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
