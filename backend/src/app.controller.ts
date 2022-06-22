import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
