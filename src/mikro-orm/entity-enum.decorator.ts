import { AnyEntity, Dictionary, Enum, EnumOptions } from '@mikro-orm/core'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'


export function EntityEnum<T extends object>(options?: (EnumOptions<AnyEntity> & { enumName?: string }) | (() => Dictionary)): PropertyDecorator {
  const decorators: PropertyDecorator[] = [
    Enum<T>(options) as PropertyDecorator,
  ]

  const e = typeof options === 'function' ? options : options?.items
  const n = typeof options === 'object' ? options.enumName : undefined

  decorators.push(ApiProperty({
    enum: e,
    enumName: n,
    description: typeof options === 'object' && options?.comment ? options.comment : undefined,
  }))

  return applyDecorators(...decorators)
}
