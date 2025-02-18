/**
 * This DTO is used to serialize entity references in the response.
 * When mikroORM serialization.forceObject is set to true.
 */

import { IsNumberString } from 'class-validator'
import { BaseEntity } from './base.entity.js'


export class EntityReferenceDto<T extends BaseEntity> {
  @IsNumberString({ no_symbols: true })
  id!: T['id']
}
