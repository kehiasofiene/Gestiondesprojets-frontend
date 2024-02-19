export class Reclamation{
    id:number;
    reclamation_date:Date;
    description:string;
    reclamation_status:Reclamation_status;
    user:{id:number}

    constructor(id:number,reclamation_date:Date,description:string,reclamation_status:Reclamation_status,user:{id:number}){
        this.id=id;
        this.reclamation_date=reclamation_date;
        this.description=description;
        this.reclamation_status=reclamation_status;
        this.user=user;
    }
}
enum Reclamation_status{
    In_Progress,Resolved,Rejected,Pending,Under_Review
}