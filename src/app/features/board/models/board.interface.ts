export interface Board {
  id: string;
  title: string;
  task: Table[];
}

export interface Table {
  id: string;
  title: string;
  task: Task[];
}
export interface Task {
  id: string;
  title: string;
}
