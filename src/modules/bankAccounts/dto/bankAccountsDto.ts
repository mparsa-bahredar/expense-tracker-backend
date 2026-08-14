import { IsNumber, IsString } from "class-validator";

export class CreateBankAccountDto {
  @IsString()
  bankName!: string;

  @IsString()
  cardNumber!: string;

  @IsString()
  accountNumber!: string;

  @IsNumber()
  balance!: number;
}