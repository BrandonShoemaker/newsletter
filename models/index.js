const User = require('./User.js');
const Post = require('./Post.js');
const Vote = require('./Vote.js');


User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
})

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
})

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_ post',
    foreignKey: 'post_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Vote, {
    foreignKey: 'post_id'
})


Vote.belongsTo(User, {
    foreignKey: 'user_id'
})

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = {Vote, Post, User};