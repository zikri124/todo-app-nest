import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkUserExist = await this.userRepo.findOne({
      where: {
        name: createUserDto.name
      }
    });

    if (checkUserExist) {
      throw new ConflictException('Username already exixt', { cause: new Error(), description: 'Cant register with this username, because it is already registered' })
    }
    
    createUserDto.password = await this.hashPassword(createUserDto.password)

    const newUser = await this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepo.find()
      .then(users => users.map(user => UserDto.fromEntity(user)));
  }

  async findOneById(id: string): Promise<UserDto> {
    const userFind = await this.userRepo.findOne({
      where: {
        id: id
      }
    })

    if (!userFind) {
      throw new NotFoundException('The user you want to find with that id was not found', { cause: new Error(), description: 'The user you want to find with that id was not found, please insert the correct id' });
    }

    return UserDto.fromEntity(userFind)
  }

  async findOneByName(name: string): Promise<UserDto> {
    const userFind = await this.userRepo.findOne({
      where: {
        name: name
      }
    })

    if (!userFind) {
      throw new NotFoundException('The user you want to find was not found', { cause: new Error(), description: `The user you want to find with username: "${name}" was not found, please insert the correct username` });
    }

    return UserDto.fromEntity(userFind)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    await this.findOneById(id);

    if (updateUserDto.password != undefined) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password)
    }

    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOneById(id);
    return await this.userRepo.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
  }
}
