require('dotenv').config()
module.exports =
{
    "development": {
    "username": process.env.TDB_USERNAME,
    "password": process.env.TDB_PASSWORD,
    "database": process.env.TDB_DATABASE,
    "host": process.env.TDB_HOST,
    "port": process.env.TDB_PORT,
    "dialect": process.env.TDB_DIALECT,
    "options": {
        "encrypt": "false"
        }
    },
    "production": {
    "username": process.env.TDB_USERNAME,
    "password": process.env.TDB_PASSWORD,
    "database": process.env.TDB_DATABASE,
    "host": process.env.TDB_HOST,
    "port": process.env.TDB_PORT,
    "dialect": process.env.TDB_DIALECT,
     "options": {
            "encrypt": "false"
        }
    }
};