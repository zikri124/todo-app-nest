import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) {}
  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newUser = await this.taskRepo.create(createTaskDto)
    return this.taskRepo.save(newUser);
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
