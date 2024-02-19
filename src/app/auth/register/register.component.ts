import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gender, User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders=['Male','Female'];
  public registerForm!:FormGroup;
  photo!:File;
  user=new User(10,"you@gmail.com","hhfhjldfhjlefse","12544255jhfhf","12544255jhfhf","C:\Users\ASUS\IdeaProjects\Gestiondesmanagers - Copie (security)\src\main\resources\static\files\sofiene.jpg","975257555","you","you","tunisien",51515452,new Date(),Gender.Male,"Manager","Manager",{id:1});
  dept!:number;
  public userdept!:number;
  public userIdToUpdate!:number;
  public isUpdateActive : boolean=false;
  selectedFile: File|null=null;

  constructor(private api:UserService,private fb:FormBuilder, private route: ActivatedRoute,private router: Router, private toast:ToastrService) { }

  ngOnInit(): void {
    //this.dept = this.route.snapshot.params['id'];
    this.registerForm=this.fb.group({
      id: [null],
      email: ['',Validators.required],
      login:['',Validators.minLength(8)],
      password:['',[Validators.minLength(8),Validators.required]],
      confirmpassword:['',[Validators.minLength(8),Validators.required]],
      nationality:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      cin:['',Validators.minLength(8)],
      phone_number:['',Validators.required],
      birth_date:['',Validators.required],
      gender:['',Validators.required],
      work_post:['',Validators.required],
      role:['',Validators.required],
      image:['',Validators.required]
    },{Validator: this.passwordsMatchValidator});
    
    this.route.params.subscribe(val=>{
      console.log("hi");
      this.userIdToUpdate=val['id'];
      console.log('hi');
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getuser(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.fillformToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
    })
  }
  
  fillformToUpdate(user:User){
    console.log(user.id);
   this.registerForm.setValue({
    id:user.id,
    firstname:user.firstname,
    email:user.email,
    login:user.login,
    password:user.password,
    confirmpassword:user.confirmpassword,
    nationality:user.nationality,
    lastname:user.lastname,
    cin:user.cin,
    phone_number:user.phone_number,
    birth_date:user.birth_date,
    gender:user.gender,
    work_post:user.work_post,
    role:user.role,
    image:user.image
   })
  }

  update(){
    this.api.updateuser(this.registerForm.value, this.userIdToUpdate)
    .subscribe(res => {
      this.router.navigate(['listusers']);
      this.registerForm.reset();
    });
  }
  
  backtolist(){
    if(this.isUpdateActive==true){
      this.router.navigate(['listusers']);
    }
    else{
      this.router.navigate(['listusers']);
    }
  }
  
  onPhotoSelected(event: any): void {
    this.photo =event.target.files[0];   
     }

     passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.get('password');
      const confirmpassword = control.get('confirmpassword');
    
      if (password && confirmpassword && password.value !== confirmpassword.value) {
        return { 'passwordMismatch': true };
      }
    
      return null;
    }

     submit(){
      console.log(this.registerForm)
      this.api.postRegistration(this.registerForm.value,this.route.snapshot.params['department']).subscribe(
        (data)=>{
                   this.api.setimage(this.photo,data.id).subscribe(()=>console.log(data.image));

                   this.toast.success("Success","User Added Successfully");
                   this.registerForm.reset();

          // if(data.role=="Manager"){
          //   this.router.navigate(['project']);
          // }
          // else if(data.role=="Client"||data.role=="Employee"){
          //   this.router.navigate(['login']);
          // }
          // else{
          //   this.router.navigate(['listusers']);
          // }
        },    
        (error)=>{
          console.log(error)
          
        })
      }
      onFileSelected(event: any) {
        this.selectedFile = event.target.files[0]; 
        console.log(this.selectedFile);// Chemin absolu
       
      }

}
