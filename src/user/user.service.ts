import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const checkUserExist = await this.findOneByName(createUserDto.name);

    if (checkUserExist) {
      throw new ConflictException('Username already exixt', { cause: new Error(), description: 'Cant register with this username, because it is already registered' })
    }

    await bcrypt.hash(createUserDto.password, saltRounds).then(async (hash) => {
      createUserDto.password = hash
    })
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userRepo.update(id, updateUserDto);
    return await this.findOneById(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
