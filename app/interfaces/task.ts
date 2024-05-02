export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export interface Task {
    id: string,
    title: string,
    targetTime: Date,
    description: string,
    tags: string[],
    priority: Priority
}
