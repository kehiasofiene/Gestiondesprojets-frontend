import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Toast,ToastrService,ToastPackage  } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Project } from '../../model/Project';
import { Task } from '../../model/Task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  projectForm !: FormGroup;
  actionBtn: string ="Save"
  task!:Task;
  
  constructor(private formBuilder:FormBuilder,
    private projectservice:ProjectService,
    private toast:ToastrService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private DialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.projectForm=this.formBuilder.group({
      id: [null],
      title: ['',Validators.required],
      description:['',Validators.required],
      start_date:['',Validators.required],
      end_date:['',Validators.required],
      project_status:['',Validators.required]
    })
   if(this.editData){
    this.actionBtn="update";
    this.projectForm.controls['id'].setValue(this.editData.id);
    this.projectForm.controls['title'].setValue(this.editData.title);
    this.projectForm.controls['description'].setValue(this.editData.description);
    this.projectForm.controls['start_date'].setValue(this.editData.start_date);
    this.projectForm.controls['end_date'].setValue(this.editData.end_date);
    this.projectForm.controls['project_status'].setValue(this.editData.project_status);
   }
  }
 
 
  
  addProject(){
    if(!this.editData){
    if(this.projectForm.valid){
   this.projectservice.addProject(this.projectForm.value)
   .subscribe({
    next:(res)=>{
      this.toast.success("Success","Project Added Successfully");
      this.projectForm.reset();
      this.DialogRef.close('save');
    },
   error:()=>{
    this.toast.error("error");
   }
  }
   )
   }
  }
  else{
    this.updateproject();
  }
}

updateproject(){
  if (this.editData && this.projectForm.valid) {
  // if(this.task.project=this.projectForm.value){
    // const userPhoneNumber = this.task.user.phone_number;}
    //const projectToUpdate: Project = { ...this.projectForm.value, userPhoneNumber };

  this.projectservice.UpdateProject(this.projectForm.value)//this.editData.id)
  .subscribe({
    next:(res:Project)=>{
      this.toast.success("Success","Project updated Successfully");
      this.projectForm.reset();
      this.DialogRef.close('update');
 },
error:()=>{
  this.toast.warning("warning","error");
},});
}

}}
