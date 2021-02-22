import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Logger,
	OnModuleInit
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue, Job, DoneCallback } from 'bull';

@Controller('queue')
export class QueueController {
	private readonly logger = new Logger(QueueController.name);
	constructor(
		private readonly queueService: QueueService,
		@InjectQueue('queue') private readonly queue: Queue
	) {}

	onModuleInit() {
		this.queue.process((job: Job, done: DoneCallback) => {
			done(null, job.data);
		});
	}

	@Get()
	findAll(): string {
		return this.queueService.findAll();
	}

	@Get('twice/:x')
	async createTwiceJob(@Param('x', new ParseIntPipe()) x: number) {
		return {
			message: 'Twice job created',
			data: await this.queue.add('twice', x)
		};
	}

	@Get('thrice/:x')
	async createThriceJob(@Param('x', new ParseIntPipe()) x: number) {
		return {
			message: 'Thrice job created',
			data: await this.queue.add('thrice', x)
		};
	}

	@Get('job/:id')
	async getJob(@Param('id') id: string) {
		return await this.queue.getJob(id);
	}
}
