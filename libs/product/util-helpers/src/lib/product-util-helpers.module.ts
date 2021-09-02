import { FileTypeMap } from '@esc/product/models';
import { ErrorMessages } from '@esc/shared/util-models';
import { Express, Request } from 'express';
import 'multer';

export const imageFileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: any
) => {
  const isFileValid = FileTypeMap.has(file.mimetype);

  let uploadError: Error | null = new Error(ErrorMessages.INVALID_IMAGE_TYPE);

  if (isFileValid) {
    uploadError = null;
  }

  return cb(uploadError, file.originalname);
};

export const getImageUrl = (
  req: Request,
  image: Express.Multer.File
): string => {
  const protocol = req.protocol;
  const host = req.get('host');
  const filename = image.path;

  return `${protocol}://${host}/api/${filename}`;
};
