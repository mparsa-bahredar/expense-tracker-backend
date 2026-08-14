import {
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";

export class GoalQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn([
    "targetAmount",
    "currentAmount",
    "createdAt",
  ])
  sortBy?:
    | "targetAmount"
    | "currentAmount"
    | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";

  @IsOptional()
  @IsIn(["upcoming", "passed"])
  deadline?: "upcoming" | "passed";
}