import { Property, PropertyOptions } from '@mikro-orm/core'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsCurrency, IsOptional } from 'class-validator'


export function EntityMoneyProperty<T extends object>(options?: PropertyOptions<T>): PropertyDecorator {
  const decorators: PropertyDecorator[] = []

  if (options?.nullable) decorators.push(IsOptional())


  const comment = options?.comment || '金额(货币)'
  const pOpts = options || {}
  if (!pOpts.columnType && !pOpts.type) {
    pOpts.type = 'money'
  }


  return applyDecorators(
    ...decorators,
    IsCurrency({ symbol: '' }),
    ApiProperty({ type: 'number', format: 'double', description: comment }),
    Property(pOpts) as PropertyDecorator,
  )
}
