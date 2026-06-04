import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddFriendDto {
    @IsString()
    @IsOptional()
    friendUsername?: string;

    @IsInt()
    @IsOptional()
    friendId?: number;
}
