import postgres from 'postgres';

export default postgres({
    database: DATABASE,
    username: USERNAME,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    ssl: SSLMODE
});