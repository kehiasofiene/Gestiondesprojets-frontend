import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
public dataSource!:MatTableDataSource<User>;
public users!:User[];
public user1!:User;
u:string="../../../assets/img/profiles/";
  url!:string;


@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 displayedColumns:string[]=['id','email','login','firstname','lastname','role','action']
 //,'image','phone_number',
//   'firstname','lastname','nationnality','cin','birthdate','gender','work_post','role','department','action']


  constructor(private user:UserService,private router:Router,private dialog: MatDialogModule) { }

  ngOnInit(): void {
   
    this.getUsers();
  }


getUsers(){
  this.user.getusers().
  subscribe(res=>{
    res.map(img=> this.u+img.image)
    this.users =res;
    this.dataSource=new MatTableDataSource(this.users);
    this.dataSource.paginator =this.paginator;
    this.dataSource.sort=this.sort;
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

deleteuser(id:number){
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if(confirmDelete){
  this.user.deleteuser(id) .subscribe({
    next:(res)=>{
      alert("User deleted successfully");
      this.getUsers();
    },
    error:()=>{
      alert("error while deleting the project!")
    }
});
}
}

edit(id:number){
 this.router.navigate(['update',id])
}

getimage(id:number){
  return this.user.getimage(this.displayedColumns.indexOf('id'));
}


}
