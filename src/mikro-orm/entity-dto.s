

import { MetadataStorage, Collection, Opt, Ref } from '@mikro-orm/core'
import { BaseEntity } from './base.entity.js'
import { EntityReferenceDto } from './entity-reference.dto.js'
import { getApiProperties, setApiProperties } from '~/utils/api-property-decortor-utils.js'
import { Type } from '@nestjs/common'
import { copyTransformMetadata } from '~/utils/transform-decorator-utils.js'
import { copyTypeMetadata } from '~/utils/type-decorator-utils.js'


type IEntityDto<T extends BaseEntity> = {
  [key in keyof T]: T[key] extends Collection<infer U>
    ? U extends BaseEntity
      ? EntityReferenceDto<U>[]
      : T[key]
    : T[key] extends Ref<infer U>
      ? U extends BaseEntity
        ? EntityReferenceDto<U>
        : T[key]
      : T[key] extends infer U & Opt
        ? U | undefined
        : T[key] extends Opt<infer U>
          ? U | undefined
          : T[key]
}

function build(targetRef: Type<any>, parentRef: BaseEntity): void {
  const classSchema = getApiProperties(parentRef as any)

  setApiProperties(targetRef, classSchema)

  for (const prop in classSchema) {
    copyTransformMetadata(parentRef as any, targetRef, prop)
    copyTypeMetadata(parentRef as any, targetRef, prop)

    // MetadataStorage.getMetadataFromDecorator()
  }
}

export function EntityDto<T extends BaseEntity>(entity: T): IEntityDto<T> {
  abstract class EntityDto {}
  build(EntityDto as any, entity)

  return EntityDto as IEntityDto<T>
}
