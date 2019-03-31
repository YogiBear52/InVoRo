import Status from "./Status";

export default class Feature {
    public id:string;
    public name:string;
    public status:Status;
    public link:string;

    public constructor(id: string, name: string, status: Status, link: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.link = link;
    }
}