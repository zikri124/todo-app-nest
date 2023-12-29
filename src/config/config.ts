export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        type: process.env.DB_TYPE,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        sync: process.env.DB_SYNCRONIZE
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expireTime: process.env.JWT_EXPIRE_TIME 
    } 
})
