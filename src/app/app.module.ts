import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './project/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import{ReactiveFormsModule} from '@angular/forms';
import{FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UserDetailComponent } from './auth/user/user-detail/user-detail.component';
import { RegistrationListComponent } from './auth/user/registration-list/registration-list.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { NavbarComponent } from './task/navbar/navbar.component';
import { TodoComponent } from './task/todo/todo.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectuserComponent } from './project/projectuser/projectuser.component';
import { TasksprojectComponent } from './project/tasksproject/tasksproject.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileuserComponent } from './profile/profileuser/profileuser.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProjectlistComponent,
    DialogComponent,
    UserDetailComponent,
    RegistrationListComponent,
    NavbarComponent,
    TodoComponent,
    ForgetpasswordComponent,
    DashboardComponent,
    ProjectuserComponent,
    TasksprojectComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
