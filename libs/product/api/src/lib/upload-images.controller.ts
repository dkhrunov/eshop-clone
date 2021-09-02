import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Request, Response } from 'express';
import { FILE_TYPE_MAP } from '@esc/product/models';
import { ErrorMessages } from '@esc/shared/util-models';

@Controller('uploads')
export class UploadImagesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_: Request, file: Express.Multer.File, cb) => {
          const isFileValid = FILE_TYPE_MAP.has(file.mimetype);

          let uploadError: Error | null = new Error(
            ErrorMessages.INVALID_IMAGE_TYPE
          );

          if (isFileValid) {
            uploadError = null;
          }

          return cb(uploadError, file.originalname);
        },
      }),
    })
  )
  uploadImage(@UploadedFile() image: Express.Multer.File, @Req() req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');
    const filename = image.path;

    const imageUrl = `${protocol}://${host}/api/${filename}`;

    return {
      imageUrl,
    };
  }

  @Get(':id')
  getImage(@Param('id') id: string, @Res() res: Response) {
    res.sendFile(id, { root: './uploads' });
  }
}
