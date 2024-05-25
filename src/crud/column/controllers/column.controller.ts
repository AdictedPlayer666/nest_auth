import { Controller, Body, Get, Put, Post, Delete, Param, Header, BadRequestException, NotFoundException, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnDto } from '../dto/column.dto';
import { ColumnService } from '../services/column.service';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { col } from 'sequelize';

@Controller('user/:id/columns/')
export class ColumnController {
  constructor(
    private readonly ColumnService: ColumnService,

  ) { }

  @ApiTags('get_column')
  @UseGuards(OwnerGuard)
  @Get(':column_name')
  @UsePipes(new ValidationPipe())
  async findUserColumns(@Param() colDto: ColumnDto) {

    return await this.ColumnService.GetColumnData(colDto);

  }

  @ApiTags('delete_column')
  @UseGuards(OwnerGuard)
  @Delete(':column_name')
  @UsePipes(new ValidationPipe())
  async DeleteColumn(@Param() colDto: ColumnDto) {
    return await this.ColumnService.deleteColumn(colDto);
  }


  @ApiTags('create_column')
  @Post('add')
  @UseGuards(OwnerGuard)
  @UsePipes(new ValidationPipe())
  async createColumn(@Param('id') id: ColumnDto["id"], @Body('column_name') column_name: ColumnDto["column_name"]) {
    return await this.ColumnService.createColumn(id, column_name);
  }

  @ApiTags('update_column')
  @Put(':column_name')
  @UseGuards(OwnerGuard)
  @UsePipes(new ValidationPipe())
  async updateColumn(@Param() colDto: ColumnDto, @Body('new_name') new_name: string) {
    return await this.ColumnService.updateColumn(colDto, new_name);
  }
}