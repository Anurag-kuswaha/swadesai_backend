const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                  foreignKey: 'authorId'
            });
        }
    }
    Post.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};
