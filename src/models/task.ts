export type Task = {
    taskText: string
    completed: boolean
    sectionId: number
    id: number
    taskType: TaskType
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY,
}
