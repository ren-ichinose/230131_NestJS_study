import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemController {
}
