import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";


export class CreateTransactionDto {
  @IsNumber()
  categoryId!: number;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsIn(["INCOME", "EXPENSE"])
  type!: "INCOME" | "EXPENSE";

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  bankAccountId?: number;

  @IsOptional()
  @IsNumber()
  walletId?: number;
}