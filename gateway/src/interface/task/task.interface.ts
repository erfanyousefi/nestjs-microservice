export type TaskStatus = "Pending" | "In-Progress" | "Done" | "Cancel";
export interface ITask {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
}
