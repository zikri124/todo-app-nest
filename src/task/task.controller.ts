import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RoleGuard } from 'src/common/guard/role/role.guard';
import { UserRole } from 'src/common/constants/userRoles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return {
      tasks: await this.taskService.findAll()
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      task: await this.taskService.findOne(id)
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
