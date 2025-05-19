"use strict";
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var dotenv = require("dotenv");
dotenv.config({ path: '.env.test' });
var TestDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5436', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*-migration.js'],
    migrationsRun: false
});
exports["default"] = TestDataSource;
