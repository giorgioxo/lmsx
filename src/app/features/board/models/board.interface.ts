export interface Task {
  id: string;
  title: string;
}

export interface Table {
  id: string;
  title: string;
  tasks: Task[]; // ✅ უნდა იყოს tasks
}

export interface BoardState {
  tables: Table[]; // ✅ უნდა იყოს tables
}
