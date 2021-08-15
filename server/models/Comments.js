module.exports=(sequelize,Datatypes)=>{
    const Comments=sequelize.define("Comments",{
        comment:{
            type:Datatypes.STRING,
            allowNull:false,
        },
        username:{
            type:Datatypes.STRING,
            allowNull:false,
        },

    });
    return Comments;
};
