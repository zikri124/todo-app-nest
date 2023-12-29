import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepo.findOne({
      where: {
        id: createTaskDto.user_id
      }
    })
    const newTask = await this.taskRepo.create(createTaskDto)
    newTask.user = user
    return this.taskRepo.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskRepo.findOneBy({ id })
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepo.update(id, updateTaskDto)
    return await this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
