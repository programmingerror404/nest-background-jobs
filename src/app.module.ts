import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		BullModule.forRoot({
			redis: {
				host: 'localhost',
				port: 6379
			}
		}),
		QueueModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
