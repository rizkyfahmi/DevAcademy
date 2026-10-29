import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChatPromptDto {
  @IsString()
  @IsNotEmpty({ message: 'Prompt cannot be empty' })
  prompt: string;

  @IsString()
  @IsOptional()
  systemMessage?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
