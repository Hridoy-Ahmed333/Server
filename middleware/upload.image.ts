import multer from 'multer';
import * as path from 'path';

const uploadFilePath = path.resolve(__dirname, '../..', 'dist/public/uploads');

const storageFile: multer.StorageEngine = multer.diskStorage({
    destination: uploadFilePath,
    filename(_req: Express.Request, file: Express.Multer.File, fn: (error: Error | null, filename: string) => void): void {
        fn(null, `land-${new Date().getTime().toString()}${path.extname(file.originalname)}`);
    },
});

const uploadFile = multer({
    storage: storageFile,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(_req, file, callback) {
        const extension: boolean = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;

        if (extension && mimeType) {
            return callback(null, true);
        }
        callback(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
    },
});

export { uploadFile }