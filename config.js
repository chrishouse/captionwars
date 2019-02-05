const env = process.env;

export const nodeEnv = env.NODE_ENV || "development";

export default {
    port: env.port || 8080
};
