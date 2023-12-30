import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  
  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const user = await this.userRepo.findOne({
      where: {
        id: createTaskDto.user_id
      }
    })
    const newTask = await this.taskRepo.create(createTaskDto)
    newTask.user = user
    const savedTask = await this.taskRepo.save(newTask);
    return TaskDto.fromEntity(savedTask);
  }

  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.taskRepo.find({
      relations: {
        user: true
      }
    });

    if (!tasks) {
      throw new NotFoundException('The task you want to find with that id was not found', { cause: new Error(), description: 'The user you want to find with that id was not found, please insert the correct id' });
    }

    const tasksDto: TaskDto[] = []

    tasks.map((task) => {
      tasksDto.push(TaskDto.fromEntity(task))
    })

    return tasksDto
  }

  async findOne(id: string): Promise<TaskDto> {
    const findTask = await this.taskRepo.findOne({
      relations: {
        user: true
      },
      where: {
        id: id
      }
    })
    
    if (!findTask) {
      throw new NotFoundException('The task you want to find with that id was not found', { cause: new Error(), description: 'The user you want to find with that id was not found, please insert the correct id' });
    }

    const task = TaskDto.fromEntity(findTask);
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {
    await this.findOne(id);
    return await this.taskRepo.update(id, updateTaskDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.taskRepo.delete(id);
  }
}
