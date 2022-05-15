import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

interface UserInterface {
    first_name: string;
    last_name: string;
    date_of_birth: number;
    address: string;
    timezone : string;
    createdAt : string;
    updatedAt : string;
    deletedAt : string;
    deleted : boolean;
}

const Schema = mongoose.Schema;
const UserSchema = new Schema<UserInterface>({
    first_name: {
        type : String,
        required : true
    },
    last_name: {
        type : String,
        required : true
    },
    date_of_birth : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    timezone: {
        type : String,
        required : true
    }
}, { timestamps: true });

UserSchema.index({ role: 1 });

UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User = mongoose.model<UserInterface>('User', UserSchema);

User.ensureIndexes((err) => {
    if (err) {
        return err;
    }
    return true;
});

export default User;