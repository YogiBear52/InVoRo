export enum Status {
    NotPlanned ="NotPlanned",
    Planned ="Planned",
    InProgress ="InProgress",
    ReadySoon ="ReadySoon",
    Released = "Released"
}

export class StatusToDisplayConverter{
    public static getDisplayName(status:Status){
        switch (status) {
            case (Status.NotPlanned):
              return "Not Planned";
            case (Status.Planned):
              return "Planned";
            case (Status.InProgress):
              return "In Progress";
            case (Status.ReadySoon):
              return "Ready Soon";
            case (Status.Released):
              return "Released";
          }
          throw new Error(`An unknown status: ${status}`);
        }
}

export default Status;