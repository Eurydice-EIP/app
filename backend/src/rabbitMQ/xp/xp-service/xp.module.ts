import { Module, forwardRef } from '@nestjs/common';

import { XpService } from './xp.service';
import { XpCalculatorService } from 'src/rabbitMQ/xp/xp-calculate.service';

import { UsersModule } from 'src/users/users.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => TasksModule),
  ],
  providers: [
    PrismaService,
    XpService,
    XpCalculatorService,
  ],
  exports: [
    XpService,
    XpCalculatorService,
  ],
})
export class XpModule {}
