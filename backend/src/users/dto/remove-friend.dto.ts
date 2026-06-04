import { IsInt } from 'class-validator';

export class RemoveFriendDto {
    @IsInt()
    friendId: number;
}
