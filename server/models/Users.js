module.exports=(sequelize,Datatypes)=>{
    const Users=sequelize.define("Users",{
        username:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        phoneNo:{
            type:Datatypes.STRING,
            allowNull:false,
        },

    });
    //Posts.associate = (models) => {
        //Posts.hasMany(models.Comments, {
         // onDelete: "cascade",
       // });
     // };
    return Users;
};