// src/employee/schemas/employee.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
