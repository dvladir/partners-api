import { ApiProperty } from '@nestjs/swagger';

export class IdentifyDto {
  @ApiProperty()
  id: string;

  static toDto({ id }: { id: string }): IdentifyDto {
    const result = new IdentifyDto();
    result.id = id;
    return result;
  }
}
