export type Task = {
    taskText: string
    completed: boolean
    sectionId: number
    id: number
    taskType: TaskType
    subtasks?: SubTask[]
    wikiLink?: string
}

export type SubTask = {
    taskText: string
    completed: boolean
    id: number
}

export enum TaskType {
    NORMAL,
    DAILY,
    WEEKLY,
}
