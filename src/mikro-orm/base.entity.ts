import { OptionalProps, PrimaryKey } from '@mikro-orm/core'
// import { ApiProperty } from '@nestjs/swagger'
import { EntityProperty } from './entity-property.decorator.js'


export abstract class BaseEntity<Optional = never> {
  // [PrimaryKeyProp]?: 'id'
  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional

  // @ApiProperty({ description: '主键' })
  @PrimaryKey({
    type: 'bigint',
    comment: '主键',
  })
  id!: string

  @EntityProperty({
    type: 'datetime',
    onCreate: () => new Date(),
    defaultRaw: 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createdAt: Date = new Date()

  @EntityProperty({
    type: 'datetime',
    onUpdate: () => new Date(),
    defaultRaw: 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updatedAt: Date = new Date()
}
