export class Task {
  public id: number;
  public timeToComplete: number;
  public timeStarted: number | null;

  constructor(
    id: number, 
    timeToComplete: number,
    timeStarted: number | null
  ) {
    this.id = id;
    this.timeToComplete = timeToComplete;
    this.timeStarted = timeStarted;
  }
}