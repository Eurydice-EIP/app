import { ApiProperty } from '@nestjs/swagger';

export class LevelResponseDto {
    @ApiProperty({ example: 5 })
    level!: number;

    @ApiProperty({ example: 240 })
    xp!: number;

    @ApiProperty({ example: 2500 })
    xpToNextLevel!: number;
}
