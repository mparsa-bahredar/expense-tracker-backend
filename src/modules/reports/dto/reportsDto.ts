import { IsInt } from "class-validator";

export class ReportsDto {
  @IsInt()
  userId!: number;
}