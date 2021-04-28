const sequelize = require ('../db') // import object from db.js
const {DataTypes} = require('sequelize') // import class DataType from sequilize, to describe fields types (string, integer, etc)



/*    Models    */

const User = sequelize.define('user',{ // create model
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id field: integer, key, increase when add users
    email: {type: DataTypes.STRING, unique: true}, // email field: string, unuque.
    password: {type: DataTypes.STRING}, // password field: string
    role: {type: DataTypes.STRING, defaultValue: "USER"},  // password field: string, default value USER
})


const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
})


const BasketDevice = sequelize.define('basket_device',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Device = sequelize.define('device',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, // name field: string, unique, can't be empty
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})


const Type = sequelize.define('type',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


const Brand = sequelize.define('brand',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


const Rating = sequelize.define('rating',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})


const DeviceInfo = sequelize.define('device_info',{ 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


const TypeBrand = sequelize.define('type_brand',{ // <-- model for many to many connection
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})



/*   How Models Communicate each other   */

User.hasOne(Basket)
Basket.belongsTo(User)


User.hasMany(Rating)
Rating.belongsTo(User)


Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)


Type.hasMany(Device)
Device.belongsTo(Type)


Brand.hasMany(Device)
Device.belongsTo(Brand)


Device.hasMany(Rating)
Rating.belongsTo(Brand)


Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)


Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)



Type.belongsToMany(Brand, {through: TypeBrand }) // Many to many connection
Brand.belongsToMany(Type, {through: TypeBrand }) // Many to many connection




/*  Export all models to use them from other file  */

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,   
    DeviceInfo,
    TypeBrand
}


