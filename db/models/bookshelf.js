const knex = require('../knex');//connection to the database
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

