// src/employee/employee.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepo: EmployeeRepository) {}

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    return this.employeeRepo.create(data);
  }

  async getAllEmployeesPaginated(page: number, limit: number) {
    return this.employeeRepo.findAll(page, limit);
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepo.findById(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee> {
    const updated = await this.employeeRepo.update(id, updateData);
    if (!updated) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updated;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const deleted = await this.employeeRepo.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return deleted;
  }
}
