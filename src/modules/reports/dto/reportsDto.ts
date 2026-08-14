import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export class ReportQueryDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsIn(["INCOME", "EXPENSE"])
  type?: "INCOME" | "EXPENSE";

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsInt()
  bankAccountId?: number;

  @IsOptional()
  @IsInt()
  walletId?: number;

  @IsOptional()
  @IsIn(["amount", "createdAt"])
  sortBy?: "amount" | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}