import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
	findAll(): string {
		return 'This action returns all queues';
	}

	twice(x: number) {
		return x * 2;
	}

	thrice(x: number) {
		return x * 3;
	}
}
