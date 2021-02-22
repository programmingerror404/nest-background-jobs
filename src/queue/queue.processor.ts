import {
	Process,
	Processor,
	OnQueueActive,
	OnQueueCompleted,
	OnQueueFailed
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { QueueService } from './queue.service';

@Processor('queue')
export class QueueProcessor {
	private readonly logger = new Logger(QueueProcessor.name);
	constructor(private readonly queueService: QueueService) {}

	@Process('twice')
	processTwice(job: Job<number>) {
		return this.queueService.twice(job.data);
	}

	@Process('thrice')
	processThrice(job: Job<number>, callback: DoneCallback) {
		callback(null, this.queueService.thrice(job.data));
	}

	@OnQueueActive()
	onActive(job: Job) {
		this.logger.log(
			`Processing job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
				job.data
			)}`
		);
	}

	@OnQueueCompleted()
	onComplete(job: Job, result: any) {
		this.logger.debug(
			`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
				result
			)}`
		);
	}

	@OnQueueFailed()
	onError(job: Job<any>, error: any) {
		this.logger.error(
			`Failed job ${job.id} of type ${job.name}: ${error.message}`,
			error.stack
		);
	}
}
