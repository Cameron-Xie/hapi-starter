module.exports = {
    type: "postgres",
    host: "postgres",
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: [
        "dist/entities/**/*.js"
    ],
    migrations: [
        "dist/migration/**/*.js"
    ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration"
    }
};