import Status from "./Status";

export default class Feature {
    public id:string;
    public name:string;
    public status:Status;
    public link:string;
    public creationTime: Date;
    public lastTimeModified: Date;

    public constructor(id: string, name: string, status: Status, link: string, creationTime:Date, lastTimeModified:Date) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.link = link;
        this.creationTime = creationTime;
        this.lastTimeModified = lastTimeModified;
    }
}