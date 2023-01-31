// import pg from 'pg';
// delete pg.native;

// export default defineEventHandler((event) => {
//     const res = await event.context.pg.query('SELECT * FROM users');
//     return {
//         count: results.rowCount;
//         user: results.rows
//     }
// })

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export default defineEventHandler((event) => {
    event.context.pg = { user: 123}