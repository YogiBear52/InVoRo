import Status from "../dataModel/Status";

export default class StatusToDisplayConverter {
  public static getDisplayName(status: Status) {
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
      default:
        throw new Error(`An unknown status: ${status}`);
    }
  }
}