export class Task {
  public id: number;
  public title: string;
  public deadline: string;

  constructor(
    id: number,
    title: string,
    deadline: string,
    description?: string,
    done?: boolean
  ) 
  {}
}