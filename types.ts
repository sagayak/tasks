
export interface Task {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string; // Optional: For long-term goals
}

export interface DueDate {
    id: number;
    name: string;
    date: string; // Store dates as ISO strings (e.g., "2023-10-27")
}

export interface PlannerDay {
    day: number;
    note: string;
}

export interface Quote {
  text: string;
  author: string;
}
