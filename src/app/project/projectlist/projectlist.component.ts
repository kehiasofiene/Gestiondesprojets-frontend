import { Component, OnInit ,ViewChild} from '@angular/core';
import { Project } from 'src/app/model/Project';
import { ProjectService } from 'src/app/services/project.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/project/dialog/dialog.component';
import { error } from 'console';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  displayedColumns: string[] = ['Id','Title', 'Description', 'Start_date', 'End_date','Project_status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private projectservice:ProjectService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getProjects();
  }

  projects!: Project[];
 
  getProjects() {
    this.projectservice.getprojects()
      .subscribe({
       next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
       }
      
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

openDialog() {
  this.dialog.open(DialogComponent, {
   width: '30%'
  }).afterClosed().subscribe(val=>{
    if(val==="save"){
      this.getProjects();
    }
  }
    )
  ;
}

editProject(row:any){
  this.dialog.open(DialogComponent,{
    width:"30%",
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==="update"){
      this.getProjects();
    }
  });
}

deleteProject(id:number){
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
  if(confirmDelete){
  this.projectservice.deleteProject(id)
  .subscribe({
    next:(res)=>{
      alert("Project deleted successfully");
      this.getProjects();
    },
    error:()=>{
      alert("error while deleting the project!")
    }
  })
}
}

}
