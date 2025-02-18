
import { ApiProperty } from '@nestjs/swagger'
import { EntityReferenceDto } from './entity-reference.dto.s'
import { Collection } from '@mikro-orm/core'
import { applyDecorators } from '@nestjs/common'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'


export function ApiForeignKey(description?: string): PropertyDecorator {
  return applyDecorators(
    ((target: any, propertyKey: string | symbol) => {
      const type = Reflect.getMetadata('design:type', target, propertyKey)

      // 对于 Collection<Entity> 类型的属性，不要省略类型声明(`: Collection<Entity>`)
      // property: Collection<Entity> = new Collection<Entity>(this)
      // 省略会导致无法正确的判定 Array 类型，从而导致 swagger 生成错误的文档

      const isArray = type === Collection

      return ApiProperty({
        type: () => EntityReferenceDto,
        isArray,
        description,
      })(target, propertyKey)
    }) as PropertyDecorator,
    ValidateNested(),
    Type(() => EntityReferenceDto),
  )
}
