import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PartnerService } from '../logic/partner.service';
import { ErrorHandler } from '@common/error-handler';
import { PageDataDto } from './dto/common/page-data.dto';
import { PartnerHeaderDto } from './dto/partners/partner-header-dto';
import { PartnerDto } from './dto/partners/partner-dto';
import {
  ApiExtraModels,
  ApiOkResponse, ApiTags,
} from '@nestjs/swagger';
import { IdentifyDto } from './dto/common/identify-dto';
import { ErrorMessageCode } from '@common/error-message-code.enum';
import { ApiPaginatedResponse } from './decorators/api-paginated-response';
import { ApiErrorResponse } from './decorators/api-error-response';
import { ApiInternalErrorResponse } from './decorators/api-internal-error-response';
import { ApiValidationErrorResponse } from './decorators/api-validation-error-response';
import { ErrorInfoDto } from './dto/common/error-info-dto';

@Controller('partner')
@ApiTags('partner')
@ApiExtraModels(PartnerHeaderDto, PageDataDto, ErrorInfoDto)
export class PartnerController {
  constructor(
    private _partnerService: PartnerService,
    private _errorHandler: ErrorHandler,
  ) {}

  @Get('/search')
  @ApiPaginatedResponse(PartnerHeaderDto)
  @ApiInternalErrorResponse()
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
      return PageDataDto.toDto(data, PartnerHeaderDto.toDto);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Get(':partnerId')
  @ApiOkResponse({
    type: PartnerDto,
  })
  @ApiErrorResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessageCode.PARTNER_NOT_FOUND,
    IdentifyDto,
  )
  @ApiInternalErrorResponse()
  async getPartner(@Param('partnerId') partnerId: string): Promise<PartnerDto> {
    try {
      const partner = await this._partnerService.getPartnerById(partnerId);
      return PartnerDto.toDto(partner);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Put(':partnerId')
  @ApiOkResponse()
  @ApiErrorResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessageCode.PARTNER_NOT_FOUND,
    IdentifyDto,
  )
  @ApiValidationErrorResponse()
  @ApiInternalErrorResponse()
  async updatePartner(
    @Param('partnerId') id: string,
    @Body() partnerData: PartnerDto,
  ): Promise<unknown> {
    try {
      const partner = PartnerDto.fromDto({ id, ...partnerData });
      return this._partnerService.updatePartner(partner);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Post()
  @ApiOkResponse({
    type: IdentifyDto,
  })
  @ApiValidationErrorResponse()
  @ApiInternalErrorResponse()
  async addPartner(@Body() partnerData: PartnerDto): Promise<IdentifyDto> {
    try {
      const partner = PartnerDto.fromDto(partnerData);
      const result = await this._partnerService.addPartner(partner);
      return IdentifyDto.toDto(result);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }

  @Delete(':partnerId')
  @ApiOkResponse()
  @ApiErrorResponse(
    HttpStatus.NOT_FOUND,
    ErrorMessageCode.PARTNER_NOT_FOUND,
    IdentifyDto,
  )
  @ApiInternalErrorResponse()
  async removePartner(@Param('partnerId') id: string): Promise<unknown> {
    try {
      return this._partnerService.removePartner(id);
    } catch (e) {
      this._errorHandler.handleError(e);
    }
  }
}
