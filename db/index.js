const { Pool } = require('pg')

const pool = new Pool(
    {
        user: 'pipedrive',
        host: 'db',
        database: 'pipedrive',
        password: 'pipedrive',
        port: 5432,
    }
)

const tabelName = 'organization';

let pg_query = {
  query:  async (text, params) => pool.query(text, params),
  transactionStart: async () => pool.query('BEGIN') ,
  transactionCommit: async () => pool.query('COMMIT') ,
  transactionRollBack: async () => pool.query('ROLLBACK') 
};

let createTableQuery = `
    CREATE TABLE IF NOT EXISTS organization(
        id bigserial primary key,
        lft bigint,
        rght bigint,
        name varchar(255) not null UNIQUE
    )
`;
let createTableValue = [];

async function seedTable(){

    try{
        const result = await pg_query.query(createTableQuery, createTableValue);
    }catch(err){
        console.error(err);
    }
}

seedTable();
module.exports = pg_query;