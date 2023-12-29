import { UserDto } from "src/user/dto/user.dto"
import { User } from "src/user/entities/user.entity"

export class CreateTaskDto {
    user_id: string
    user: UserDto
    title: string
    status: string
    content: string
}
