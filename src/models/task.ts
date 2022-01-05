export type Task = {
    taskText: string,
    completed: boolean,
    section: string,
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY
}