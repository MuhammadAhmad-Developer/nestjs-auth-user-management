import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {

      if (file.fieldname === 'file1') {
        cb(null, './src/uploads/molecular');
      } else {
        cb(null, './src/uploads/physical');
      }
    },

    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9);

      cb(
        null,
        uniqueName + extname(file.originalname),
      );
    },
  }),
};