export type Task = {
    taskText: string
    completed: boolean
    sectionId: string
    id: number
    taskType: TaskType
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY,
}
