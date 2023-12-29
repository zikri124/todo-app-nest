import { UserDto } from "src/user/dto/user.dto"

export class CreateTaskDto {
    user_id: string
    user: UserDto
    title: string
    status: string
    content: string
}
