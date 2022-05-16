import * as Sequelize from "sequelize";
import sequelize from "../../../../configs/postgres";
import {Timestamp} from "typeorm";
import {DataTypes} from "sequelize";

export interface UserModel extends Sequelize.Model {
    id : string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    address: string;
    timezone : string;
    createdAt : Timestamp;
    updatedAt : Timestamp;
    deletedAt : Timestamp;
}

const User = sequelize.define<UserModel>("userModel", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID
    },
    first_name: {
        type : Sequelize.STRING
    },
    last_name: {
        type : Sequelize.STRING
    },
    date_of_birth : {
        type : Sequelize.DATE
    },
    address : {
        type : Sequelize.STRING
    },
    timezone: {
        type : Sequelize.STRING
    },
},{
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'user'
});

export default User;