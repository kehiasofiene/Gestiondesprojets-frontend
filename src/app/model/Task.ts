export class Task{
    id:number;
    title:string;
    description:string;
    start_date:string;
    end_date:string;
    task_status:Task_status;
    user :{id:number}
    project :{id:number}

    constructor(id:number,title:string,description:string,start_date:string,end_date:string,task_status:Task_status,user:{id:number},project:{id:number}){
        this.id=id;
        this.title=title;
        this.description=description;
        this.start_date=start_date;
        this.end_date=end_date;
        this.task_status=task_status;
        this.user=user;
        this.project=project;
    }
}
export enum Task_status{
    in_progress,suspended,completed,Blocked,Cancelled
}