import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task_status } from 'src/app/model/Task';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!:FormGroup;
  tasks:Task[]=[];
  inprogress:Task_status[]=[];
  suspended:Task_status[]=[];
  completed:Task_status[]=[];
  Blocked:Task_status[]=[];
  Cancelled:Task_status[]=[];
  constructor(private fb:FormBuilder,private taskservice:TaskService) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
    item:['',Validators.required]
    })
  }

  addTask(){
    // this.tasks.push({
    //   description:this.todoForm.value.item,
    //   done:false
    // })
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  getTasksByStatus(taskStatus: Task_status) {
    this.taskservice.getTasksByStatus(taskStatus).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
