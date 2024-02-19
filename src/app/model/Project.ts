export class Project{
    id:number;
    description:string;
    start_date:Date;
    end_date:Date;
    title:string;
    project_status:Project_status;

    constructor(id:number,title:string,description:string,start_date:Date,end_date:Date,project_status:Project_status){
        this.id=id;
        this.title=title;
        this.description=description;
        this.start_date=start_date;
        this.end_date=end_date;
        this.project_status=project_status;
    }
}
export enum Project_status{
    Not_Started,In_Progress,Suspended,Delayed,Completed,Cancelled
}