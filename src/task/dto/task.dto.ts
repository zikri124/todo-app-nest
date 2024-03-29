import { Task } from "../entities/task.entity";

export class TaskDto {
    id: string
    user_id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date

    public static fromEntity(entity: Task) {
        return {
            id: entity.id,
            title: entity.title,
            content: entity.content,
            user_id: entity.user.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}