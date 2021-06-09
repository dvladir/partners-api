import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PartnerService } from '../logic/partner.service';
import { ErrorHandler } from '@common/error-handler';
import { PageDataDto, toPageDataDto } from './dto/page-data.dto';
import { PartnerHeaderDto, toPartnerHeaderDto } from './dto/partner-header-dto';
import {
  fromPartnerDto,
  PartnerDto,
  PartnerUpdateDataDto,
  toPartnerDto,
} from './dto/partner-dto';

@Controller('partner')
export class PartnerController {
  constructor(
    private _partnerService: PartnerService,
    private _errorHandler: ErrorHandler,
  ) {}

  @Get('/search')
  async search(
    @Query('query') queryString?: string,
    @Query('pageNum') pageNum = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PageDataDto<PartnerHeaderDto>> {
    try {
      const data = await this._partnerService.searchPartners(
        queryString,
        pageNum,
        pageSize,
      );
      return toPageDataDto(data, toPartnerHeaderDto);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Get(':partnerId')
  async getPartner(@Param('partnerId') partnerId: string): Promise<PartnerDto> {
    try {
      const partner = await this._partnerService.getPartnerById(partnerId);
      return toPartnerDto(partner);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Put(':partnerId')
  async updatePartner(
    @Param('partnerId') id: string,
    @Body() partnerData: PartnerUpdateDataDto,
  ): Promise<unknown> {
    try {
      const partner = fromPartnerDto({ id, ...partnerData } as PartnerDto);
      return this._partnerService.updatePartner(partner);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Post()
  async addPartner(
    @Body() partnerData: PartnerUpdateDataDto,
  ): Promise<{ id: string }> {
    try {
      const partner = fromPartnerDto(partnerData as PartnerDto);
      return this._partnerService.addPartner(partner);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Delete(':partnerId')
  async removePartner(@Param('partnerId') id: string): Promise<unknown> {
    try {
      return this._partnerService.removePartner(id);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }
}
