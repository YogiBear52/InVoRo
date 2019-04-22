import Status from "./Status";

export default class Feature {
    public id:string;
    public name:string;
    public status:Status;
    public link:string | null;
    public creationTime: Date;
    public lastTimeModified: Date;

    public constructor(id: string, name: string, status: Status, link: string | null, creationTime:Date, lastTimeModified:Date) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.link = link;
        this.creationTime = creationTime;
        this.lastTimeModified = lastTimeModified;
    }
}

export class FeatureDTO extends Feature {

    public categoryName: string;
    public constructor(id: string, name: string, status: Status, link: string | null,categoryName: string, creationTime:Date, lastTimeModified:Date) {
        super(id,name,status,link,creationTime,lastTimeModified);
        this.categoryName = categoryName;
    }
}