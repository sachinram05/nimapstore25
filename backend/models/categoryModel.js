
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },

    });
    return Category
}
