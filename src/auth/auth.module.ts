import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtProviderModule } from 'src/providers/jwt/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtProviderModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
