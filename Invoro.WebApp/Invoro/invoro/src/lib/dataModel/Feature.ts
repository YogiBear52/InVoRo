import Status from "./Status";

export default class Feature {
    public id:string;
    public name:string;
    public status:Status;

    public constructor(id: string, name: string, status: Status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}