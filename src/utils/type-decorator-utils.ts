/**
 * This file contains utility functions for working with `@Type()` decorator of class-transformer.
 */

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Type } from '@nestjs/common'
import * as classTransformer from 'class-transformer/cjs/storage'

/**
 * Get the metadata of `@Type()` decorator of class-transformer.
 */
export function getTypeMetadata(classRef: Type<any>, prop: any): any | undefined {
  const metadataStorage = classTransformer.defaultMetadataStorage
  const metadataMap = metadataStorage['_typeMetadatas']

  const classMetadata = metadataMap.get(classRef)
  if (!classMetadata) return

  return classMetadata.get(prop)
}

export function setTypeMetadata(classRef: Type<any>, prop: any, metadata: any): void {
  const meta = { ...metadata, target: classRef, propertyName: prop }

  const metadataStorage = classTransformer.defaultMetadataStorage
  const metadataMap = metadataStorage['_typeMetadatas']

  metadataMap.set(classRef, meta)
}

export function copyTypeMetadata(from: Type<any>, to: Type<any>, prop: any): void {
  const metadata = getTypeMetadata(from, prop)
  if (!metadata) return

  setTypeMetadata(to, prop, metadata)
}
