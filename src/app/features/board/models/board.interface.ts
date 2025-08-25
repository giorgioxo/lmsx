export interface Task {
  id: string;
  title: string;
}

export interface Table {
  id: string;
  title: string;
  tasks: Task[];
}
export interface BoardState {
  tables: Table[];
}
