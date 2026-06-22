import { Expose } from 'class-transformer';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class TimerResponseDto {
    @ApiProperty({
        example: 1300,
        description: 'The total duration of the timer in seconds',
    })
    @Expose()
    duration!: number;
}
