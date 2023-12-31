import { Body, Controller, Global, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/siginIn.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Public()
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto)
    }

    @Public()
    @Post('signup')
    async signUp(@Body() createUserDto :CreateUserDto) {
        return await this.authService.signUp(createUserDto)
    }
}
