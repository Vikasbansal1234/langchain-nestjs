import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    Query,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
  import { Employee } from './schemas/employee.schema';
  import { CreateEmployeeDto } from './dto/create-employee.dto';
  import { UpdateEmployeeDto } from './dto/update-employee.dto';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';
  
  @ApiTags('Employee')
  @Controller('employee')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new employee' })
    @ApiResponse({ status: 201, description: 'Employee created successfully.' })
    @ApiBody({ type: CreateEmployeeDto })
    async create(@Body() data: CreateEmployeeDto): Promise<Employee> {
      return this.employeeService.createEmployee(data);
    }
  
    @Get()
    async findAll(@Query() query: PaginationQueryDto) {
      const { page = 1, limit = 10 } = query;
      return this.employeeService.getAllEmployeesPaginated(page, limit);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get employee by ID' })
    @ApiParam({ name: 'id', description: 'Employee ID' })
    async findOne(@Param('id') id: string): Promise<Employee> {
      return this.employeeService.getEmployeeById(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update employee by ID' })
    @ApiParam({ name: 'id', description: 'Employee ID' })
    @ApiBody({ type: UpdateEmployeeDto })
    async update(
      @Param('id') id: string,
      @Body() updateData: UpdateEmployeeDto,
    ): Promise<Employee> {
      return this.employeeService.updateEmployee(id, updateData);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete employee by ID' })
    @ApiParam({ name: 'id', description: 'Employee ID' })
    async delete(@Param('id') id: string): Promise<void> {
      await this.employeeService.deleteEmployee(id);
    }
  }
  