import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/siginIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(signInDto: SignInDto) {
        const checkUserExist = await this.userRepo.findOne({
            where: {
                name: signInDto.name
            }
        });

        if (!checkUserExist) {
            throw new UnauthorizedException('Wrong username or password', { cause: new Error(), description: 'Wrong username or password' });
        }

        const isPasswordValid = await bcrypt.compare(signInDto.password, checkUserExist.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong username or password', { cause: new Error(), description: 'Wrong username or password' });
        }

        const token = await this.createAuthToken({
            user_id: checkUserExist.id,
            user_name: checkUserExist.name,
            user_role: checkUserExist.role 
        })

        return {
            success: true,
            message: "Sign In success",
            token: token
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const respond = await this.userService.create(createUserDto)
        if (respond instanceof User) {
            const token = await this.createAuthToken({
                user_id: respond.id,
                user_name: respond.name,
                user_role: respond.role 
            })
    
            return {
                success: true,
                message: "User registered successfully",
                token: token
            };
        } else {
            return respond;
        }
    }

    async createAuthToken(userData: Record<string, any>): Promise<string> {
        return await this.jwtService.signAsync(userData)
    }
}
