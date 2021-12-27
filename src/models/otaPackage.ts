import * as Sequelize from "sequelize";
import sequelize from "../configs/db";
import {LargeObjectManager} from "pg-large-object";
import {Pool} from "pg"
import dotenv from "dotenv";
dotenv.config();

export interface OtaPackageModel extends Sequelize.Model {
    id: string;
    data_size: number;
    data: string;
    created_time: string;
    additional_info: string;
    file_name: string;
    title: string;
    version: string;
    search_text: string;
    type: string;
    tag: string;
    checksum: string;
    content_type: string;
    tenant_id: string;
    url: string;
    device_profile_id: string;
    checksum_algorithm: string;
}

const OtaPackage = sequelize.define<OtaPackageModel>("otaPackage", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    data_size : Sequelize.INTEGER,
    data : Sequelize.STRING,
    created_time: Sequelize.INTEGER,
    additional_info: Sequelize.STRING,
    file_name: Sequelize.STRING,
    title: Sequelize.STRING,
    version: Sequelize.STRING,
    search_text: Sequelize.STRING,
    type: Sequelize.STRING,
    tag: Sequelize.STRING,
    checksum: Sequelize.STRING,
    content_type:Sequelize.STRING,
    tenant_id: Sequelize.UUID,
    url: Sequelize.STRING,
    device_profile_id: Sequelize.UUID,
    checksum_algorithm: Sequelize.STRING
},{
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'ota_package'
});

const exportLoSaintForMaster = (oid, callback) => {
    const pool = new Pool({
        user : process.env.DB_USERNAME,
        database : process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST
    })
    const man = new LargeObjectManager({ pg: pool });
    pool.query('BEGIN', function (err, result) {
        if (err) {
            callback(err);
            pool.emit('error', err);
        }
        console.log("\nthe oid : %d\n", oid)
        const bufferSize = 16384;
        man.openAndReadableStream(oid, bufferSize, function (err, size, stream) {
            if (err) {
                return callback(err);
            }

            console.log(`Streaming a large object with a total size of ${size}`);
            stream.on('end', _ => pool.query('COMMIT'));

            callback(null, stream);
        });
    });
};

export default {OtaPackage, exportLoSaintForMaster};
