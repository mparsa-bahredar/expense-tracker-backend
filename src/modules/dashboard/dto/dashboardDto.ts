import { IsNumber } from "class-validator";

export class DashboardDto {
  @IsNumber()
  userId!: number;
}