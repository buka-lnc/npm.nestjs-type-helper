import { ToNumber } from '@buka/class-transformer-extra'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, Min } from 'class-validator'


export class PageQuery {
  @ApiProperty({
    type: 'number',
    description: '每页数量',
    required: false,
  })
  @IsOptional()
  @ToNumber()
  @IsInt()
  @Min(1)
  limit?: number

  /**
   * 页面偏移量
   */
  @ApiProperty({
    type: 'number',
    description: '页面偏移量',
    required: false,
  })
  @IsOptional()
  @ToNumber()
  @IsInt()
  @Min(0)
  offset?: number
}
