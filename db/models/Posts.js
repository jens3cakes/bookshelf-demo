const bookshelf = require('./bookshelf');




class Posts extends bookshelf.Model{
  
  get tableName(){return 'posts'}
  get hasTimestamps(){return true}
  
}

module.exports = Posts;