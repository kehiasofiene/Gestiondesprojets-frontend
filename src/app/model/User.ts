export class User {
    id: number;
    email: string;
    login: string;
    password: string;
    confirmpassword: string;
    image: string;
    phone_number: string;
    firstname: string;
    lastname: string;
    nationality:string;
    cin:number;
    birth_date:Date;
    gender:Gender;
    work_post:string;
    role :string;
    department:{id:number}

    constructor(id:number,email_address:string,login:string,password:string,confirmpassword:string,image:string,phone_number:string,
      firstname:string,lastname:string,nationnality:string,cin:number,birthdate:Date,gender:Gender,work_post:string,role:string,department:{id:number}){
        this.id=id;
        this.email=email_address;
        this.login=login;
        this.password=password;
        this.confirmpassword=confirmpassword;
        this.image=image;
        this.phone_number=phone_number;
        this.firstname=firstname;
        this.lastname=lastname;
        this.nationality=nationnality;
        this.cin=cin;
        this.birth_date=birthdate;
        this.gender=gender;
        this.work_post=work_post;
        this.role=role;
        this.department=department;
         }
  }
  
 export enum Gender{
    Male,Female
  }