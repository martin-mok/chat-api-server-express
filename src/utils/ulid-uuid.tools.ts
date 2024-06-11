import { UUIDtoULID, ULIDtoUUID } from 'ulid-uuid-converter';

export function ulidToUuid(ulidStr: string): string {
  return ULIDtoUUID(ulidStr);
}

export function uuidToUlid(uuidStr: string): string {
  return UUIDtoULID(uuidStr);
}
