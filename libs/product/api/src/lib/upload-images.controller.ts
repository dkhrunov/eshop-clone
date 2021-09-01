import {
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

@Controller('uploads')
export class UploadImagesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_: Request, file: Express.Multer.File, cb) => {
          return cb(null, file.originalname);
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
