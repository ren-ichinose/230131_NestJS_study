module.exports = {
    type: 'postgres',
    host: 'db', // docker-compose.yml で指定したコンテナ名
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    entities: ['dist/entities/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations'
    }
}
