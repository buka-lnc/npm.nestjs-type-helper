import { IsNumber } from 'class-validator'
import { PageQuery } from './page-query.js'
import { ApiProperty } from '@nestjs/swagger'

export class Pagination extends PageQuery {
  @ApiProperty({
    type: 'number',
    description: '总数',
  })
  @IsNumber()
  total!: number

  static from(total: number, pageQuery: PageQuery): Pagination {
    const pagination = new Pagination()
    pagination.total = total
    pagination.limit = pageQuery.limit
    pagination.offset = pageQuery.offset

    return pagination
  }
}
