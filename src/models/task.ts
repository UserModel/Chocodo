export type Task = {
    taskText: string,
    completed: boolean,
    section: string,
    id: number
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY
}