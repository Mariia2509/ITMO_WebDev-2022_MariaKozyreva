import pg from 'pg';
delete pg.native;

const client = new pg.Client({
    connectionString: ''
})
client.connect();

export default defineEventHandler((event) => {
    event.context.pg = { user: 123}

})