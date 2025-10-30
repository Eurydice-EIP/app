import { registerAs } from "@nestjs/config";

export default registerAs('api', () => ({
    port: parseInt(process.env.API_PORT ?? '', 10),
}));
