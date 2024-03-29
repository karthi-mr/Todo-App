export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public created_at: Date,
    public modified_at: Date,
    public is_completed: boolean
  ) {}
}

export class CreateTask {
  constructor(public title: string, public description?: string) {}
}
