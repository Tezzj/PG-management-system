import { AuthService } from './auth.service';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @CurrentUser() user: User, 
        @Res({ passthrough: true}) response: Response
    ) {
        return this.authService.login(user, response);
    }
}
