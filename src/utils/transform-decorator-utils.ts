/**
 * This file contains utility functions for working with `@Transform()` decorator of class-transformer.
 */

import { Type } from '@nestjs/common'
import * as classTransformer from 'class-transformer/cjs/storage'


export function getTransformMetadata(classRef: Type<any>, prop: string): any[] | undefined {
  const metadataStorage = classTransformer.defaultMetadataStorage
  const metadataMap = metadataStorage['_transformMetadatas']

  const classMetadata = metadataMap.get(classRef)
  if (!classMetadata) return

  const propertyMetadata = classMetadata.get(prop)

  return (Array.isArray(propertyMetadata) ? propertyMetadata : [propertyMetadata])
}


export function setTransformMetadata(classRef: Type<any>, prop: string, metadata: any): void {
  const meta = { ...metadata, target: classRef, propertyName: prop }

  const metadataStorage = classTransformer.defaultMetadataStorage
  const metadataMap = metadataStorage['_transformMetadatas']


  if (metadataMap.has(classRef)) {
    const classMetadata = metadataMap.get(classRef)
    const propertyMetadata = classMetadata.get(prop)

    if (propertyMetadata) {
      classMetadata.set(propertyMetadata, propertyMetadata.concat(meta))
    } else {
      classMetadata.set(propertyMetadata, meta)
    }
  } else {
    metadataMap.set(classRef, new Map([[prop, meta]]))
  }
}

export function copyTransformMetadata(from: Type<any>, to: Type<any>, prop: string): void {
  const metadata = getTransformMetadata(from, prop)
  if (!metadata) return

  setTransformMetadata(to, prop, metadata)
}
