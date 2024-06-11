import { ulid } from 'ulid';
import { v4 as uuidv4 } from 'uuid';
import { ulidToUuid, uuidToUlid } from '../../src/utils/ulid-uuid.tools';

describe('ULID to UUID and vice versa conversion', () => {
  // check with
  // https://www.uuidgenerator.net/version4
  // https://www.ulidtools.com/
  it('should convert ULID to UUID correctly', () => {
    const ulid = '0NAS99BAXX9BKTJYRD76WD1C7N';
    const uuid = '15565295-abbd-4ae7-a97b-0d39b8d0b0f5';
    const convertedUuid = ulidToUuid(ulid);
    expect(convertedUuid).toBe(uuid);
  });

  it('should convert UUID to ULID correctly', () => {
    const uuid = '01900707-7fd9-cfb7-9824-5a3092e5ce4c';
    const ulid = '01J03GEZYSSYVSG92T629EBKJC';
    const convertedUlid = uuidToUlid(uuid);
    expect(convertedUlid).toBe(ulid);
  });

  it('should convert ULID to UUID and back to ULID', () => {
    const genedUlid = ulid();
    const convertedUuid = ulidToUuid(genedUlid);
    const convertedBackUlid = uuidToUlid(convertedUuid);
    expect(convertedBackUlid).toBe(genedUlid);
  });

  it('should convert UUID to ULID and back to UUID', () => {
    const genedUUID = uuidv4();
    const convertedUlid = uuidToUlid(genedUUID);
    const convertedBackUuid = ulidToUuid(convertedUlid);
    expect(convertedBackUuid).toBe(genedUUID);
  });
});
