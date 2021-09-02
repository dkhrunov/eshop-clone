import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Request, Response } from 'express';
import { getImageUrl, imageFileFilter } from '@esc/product/util-helpers';
import { ProductApiService } from './product-api.service';
import { ProductEntity } from '@esc/product/models';

@Controller('uploads')
export class UploadImagesController {
  constructor(private productService: ProductApiService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileFilter,
      }),
    })
  )
  uploadImage(@UploadedFile() image: Express.Multer.File, @Req() req: Request) {
    return {
      imageUrl: getImageUrl(req, image),
    };
  }

  @Get(':id')
  getImage(@Param('id') id: string, @Res() res: Response) {
    res.sendFile(id, { root: './uploads' });
  }

  @Put('gallery/:id')
  @UseInterceptors(
    FilesInterceptor('images', 2, {
      storage: diskStorage({
        destination: './uploads',
        filename: imageFileFilter,
      }),
    })
  )
  uploadFile(
    @Param('id') id: string,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Req() req: Request
  ): Promise<ProductEntity> {
    const imageUrls: string[] = [];

    for (const image of images) {
      imageUrls.push(getImageUrl(req, image));
    }

    return this.productService.addImagesToProduct(id, imageUrls);
  }
}
