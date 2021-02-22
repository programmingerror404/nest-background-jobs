import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'queue',
			redis: {
				host: 'localhost',
				port: 6379
			}
		})
	],
	controllers: [QueueController],
	providers: [QueueService, QueueProcessor],
	exports: [BullModule]
})
export class QueueModule {}
