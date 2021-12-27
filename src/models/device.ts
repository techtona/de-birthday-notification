import * as Sequelize from "sequelize";
import sequelize from "../configs/db";

export interface DeviceModel extends Sequelize.Model {
    id: string;
    device_profile_id: string;
}

const Device = sequelize.define<DeviceModel>("deviceModel", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    device_profile_id: Sequelize.UUID,
},{
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'device'
});

export default Device;