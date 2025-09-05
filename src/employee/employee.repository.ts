// src/employee/employee.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class EmployeeRepository {
    constructor(
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<EmployeeDocument>,
    ) { }

    async create(data: Partial<Employee>): Promise<Employee> {
        const created = new this.employeeModel(data);
        return created.save();
    }

    // src/employee/employee.repository.ts

    async findAll(
        page = 1,
        limit = 10,
    ): Promise<{ items: Employee[]; total: number; page: number; limit: number }> {
        const [items, total] = await Promise.all([
            this.employeeModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.employeeModel.countDocuments().exec(),
        ]);

        return { items, total, page, limit };
    }


    async findById(id: string): Promise<Employee | null> {
        return this.employeeModel.findById(id).exec();
    }

    async update(id: string, update: Partial<Employee>): Promise<Employee | null> {
        return this.employeeModel
            .findByIdAndUpdate(id, update, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Employee | null> {
        return this.employeeModel.findByIdAndDelete(id).exec();
    }
}
