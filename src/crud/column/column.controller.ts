import { Controller, Body,  Get, Post, Delete, Param, Header, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from './dto/column.dto';
import { ColumnService } from './column.service';
import { OwnerGuard } from 'src/auth/guards/owner.guard';

@Controller('user/:id/columns/')
export class ColumnController {
    constructor(
      private readonly ColumnService: ColumnService,

    ) {}

    @ApiTags('get_column')
    @Get(':column_name')
    @UsePipes(new ValidationPipe())
    async findUserColumns(@Param() colDto: ColumnDto) {
      
      const column_data = await this.ColumnService.GetColumnData(colDto);
      return { column_data }

    }

    @ApiTags('delete_column')
    @UseGuards(OwnerGuard)
    @Delete(':column_name')
    @UsePipes(new ValidationPipe())
    async DeleteColumn(@Param() colDto: ColumnDto)
    {
      return await this.ColumnService.deleteColumn(colDto);

    }

    
    @ApiTags('create_column')
    @Post('add')  
    @UseGuards(OwnerGuard)
    // @UseGuards(ColumnGuard)
    @UsePipes(new ValidationPipe())
    async createColumn(@Param('id') id: ColumnDto["id"], @Body('column_name') column_name: ColumnDto["column_name"]) {
      const created = await this.ColumnService.createColumn(id, column_name);  
      if (created) {
        return { message: 'Column created successfully' };
      }
      throw new BadRequestException("Create error");
    }
}
