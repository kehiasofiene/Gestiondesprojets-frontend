export class Under_comment{
    id:number;
    content:string;
    publishedAt:Date;
    user:{id:number}
    comment:{id:number}

    constructor(id:number,content:string,publishedAt:Date,user:{id:number},comment:{id:number}){
        this.id=id;
        this.content=content;
        this.publishedAt=publishedAt;
        this.user=user;
        this.comment=comment;
    }
}