import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projectuser',
  templateUrl: './projectuser.component.html',
  styleUrls: ['./projectuser.component.css']
})
export class ProjectuserComponent implements OnInit {
 projectid!:number;
 public dataSource!:MatTableDataSource<User>;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

displayedColumns:string[]=['id','email','login','firstname','lastname','role','action']
public users!:User[];

  constructor(private projectservice:ProjectService,private userservice:UserService,private activatedRoute: ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.projectid = val['id'];
      this.fetchUsersForProject(this.projectid);
    })
  }
backtolist(){
  this.route.navigate(['/project']);
}
  fetchUsersForProject(projectId: number): void {
    this.projectservice.projectusers(projectId).subscribe(
      (users: User[]) => {
        this.users=users;
        this.dataSource=new MatTableDataSource(this.users);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort=this.sort;
        // Traitez les utilisateurs reçus de votre API
        console.log('Utilisateurs du projet:', users);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs du projet:', error);
      }
    );
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
    this.userservice.deleteuser(id) .subscribe({
      next:(res)=>{
        alert("User deleted successfully");
        this.fetchUsersForProject(this.projectid);
      },
      error:()=>{
        alert("error while deleting the project!")
      }
  });}
  }
  
}
