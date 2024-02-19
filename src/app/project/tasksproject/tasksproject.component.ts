import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasksproject',
  templateUrl: './tasksproject.component.html',
  styleUrls: ['./tasksproject.component.css']
})
export class TasksprojectComponent implements OnInit {
 task:Task[]=[];
 projectId!:number;
 displayedColumns: string[] = ['Id','Title', 'Description', 'Start_date', 'End_date','Task_status','action'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private taskservice:TaskService,private dialog:MatDialog,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.projectId = val['id'];
    this.tasksbyproject(this.projectId);
  })}

  tasksbyproject(projectid:number): void{
    this.taskservice.getTasksByProject(projectid).subscribe(
      (tasks) => {
        this.task=tasks;
        this.dataSource=new MatTableDataSource(tasks);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log('Tâches récupérées :', this.task);
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
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
}
