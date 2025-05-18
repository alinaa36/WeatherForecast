import { IsEmail, IsEnum, IsNotEmpty } from '@nestjs/class-validator';
import { Frequency } from '../enum/frequency.enum';

export class CreateSubscriptionDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  city: string;

  @IsEnum(Frequency)
  frequency: Frequency;
}
