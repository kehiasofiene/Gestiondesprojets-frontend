export class Comment{
    id:number;
    content:string;
    publishedAt:Date;
    task:{id:number};

    constructor(id:number,content:string,publishedAt:Date,task:{id:number}){
        this.id=id;
        this.content=content;
        this.publishedAt=publishedAt;
        this.task=task;
    }
}