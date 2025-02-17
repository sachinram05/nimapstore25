
module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        username:{
            type : DataTypes.STRING,
            allowNull : false,
        },
        email :{
            type: DataTypes.STRING,
            unique:true,
            allowNull :false,
            validate: {
                isEmail : true
            },
        },
        password : {
            type : DataTypes.STRING,
            allowNull :false,

        },
        phoneNumber : {
            type : DataTypes.INTEGER,
        },
        dateOfBirth : {
            type : DataTypes.DATEONLY,
        }
    },{
    timestamps :true
    });
    return User;
}