export type Task = {
    taskText: string
    completed: boolean
    sectionId: number
    id: number
    taskType: TaskType
    subtasks?: []
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY,
}
