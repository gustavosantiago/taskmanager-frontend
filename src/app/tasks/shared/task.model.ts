export class Task {
  public id: number;
  public title: string;
  public deadline: string;
  public description: string;
  public done: boolean;

  constructor(
    id: number,
    title: string,
    deadline: string,
    description?: string,
    done?: boolean
  ) {}
}
