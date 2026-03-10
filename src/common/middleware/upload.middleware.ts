import { diskStorage } from 'multer';
import { extname, join } from 'path';
import fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

function ensureDir(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}

export const multerOptions: MulterOptions = {

    storage: diskStorage({

        destination: (req, file, cb) => {

            let uploadPath = join(process.cwd(), 'uploads');

            if (file.fieldname === 'company_logo') {
                uploadPath = join(process.cwd(), 'uploads/logo/company');
            } else if (file.fieldname === 'attachment') {
                uploadPath = join(process.cwd(), 'uploads/attachments');
            }

            ensureDir(uploadPath);

            cb(null, uploadPath);
        },

        filename: (req, file, cb) => {

            // 1️⃣ generate unique filename
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);

            // 2️⃣ generate filename
            cb(
                null,
                `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
        },

    }),

    limits: {
        fileSize: 10 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {

        // 1️⃣ define allowed file types
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'application/pdf',
        ];

        // 2️⃣ check file type
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }

        cb(null, true);
    },

};
