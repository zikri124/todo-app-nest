import { User } from "../entities/user.entity";

export class UserDto {
    id: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date

    public static fromEntity(entity: User) {
        return {
            id: entity.id,
            name: entity.name,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}