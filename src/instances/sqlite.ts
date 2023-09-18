import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
export const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../database/db.sqlite')
    }
);