import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeRepository } from './employee.repository';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  providers: [EmployeeService,EmployeeRepository],
  // Optionally export if used elsewhere (e.g. Controller or other modules)
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
