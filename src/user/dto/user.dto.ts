import { User } from "../entities/user.entity";

export class UserDto {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date

    public static fromEntity(entity: User) {
        return {
            id: entity.id,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}