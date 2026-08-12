import {IsNumber, IsOptional, IsString, Length, Min} from "class-validator";


export class CreateBankAccountDto {
  @IsString()
  bankName!: string;

  @IsString()
  @Length(16, 16)
  cardNumber!: string;

  @IsNumber()
  @Min(0)
  balance!: number;
}


export class UpdateBankAccountDto {
  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  @Length(16, 16)
  cardNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;
}