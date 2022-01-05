import { TaskType } from "./task"

export type Section = {
    sectionName: string,
    taskType: TaskType | null,
    id: number,
}