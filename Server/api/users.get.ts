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

export default defineEventHandler(async (event) => {
    return(event.context.prisma as prismaClinet).books.findMany();

