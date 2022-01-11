export type Task = {
    taskText: string
    completed: boolean
    sectionId: number
    id: number
    taskType: TaskType
    subtasks?: []
    wikiLink?: string
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY,
}
