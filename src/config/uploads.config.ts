import { registerAs } from '@nestjs/config';

export default registerAs('uploads', () => ({
    dir: process.env.UPLOADS_DIR ?? '',
}));
