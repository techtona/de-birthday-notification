import * as Sequelize from "sequelize";
import sequelize from "../configs/db";

export interface DeviceCredentialModel extends Sequelize.Model {
    id: string;
    credentials_id: string;
    device_id: string;
    created_time: number;
}

const DeviceCredential = sequelize.define<DeviceCredentialModel>("deviceCredentialModel", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    credentials_id : Sequelize.STRING,
    device_id : Sequelize.UUID,
    created_time : Sequelize.NUMBER
},{
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'device_credentials'
});

export default DeviceCredential;