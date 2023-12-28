import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    await bcrypt.hash(createUserDto.password, saltRounds).then(async(hash) => {
      createUserDto.password = hash
    })
    const newUser = await this.userRepo.create(createUserDto)
    return this.userRepo.save(newUser)
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepo.find()
      .then(users => users.map(user => UserDto.fromEntity(user)));
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userRepo.findOneBy({ id })
      .then(user => UserDto.fromEntity(user));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userRepo.update(id, updateUserDto)
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.userRepo.delete(id)
    // .then(() => {
    //   return `Data with ${id} successfully deleted`;
    // })
  }
}
