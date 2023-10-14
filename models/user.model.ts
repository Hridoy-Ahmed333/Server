import {model, Schema} from "mongoose";

interface IUser extends Document {
    id?: number;
    name: string;
    emailID: string;
    phone: number | null;
    publicId: string;
    nationalId: string;
    nationalIdCard: string[]
    isActive: boolean
}

const userSchema: Schema = new Schema<IUser>({
    name: String,
    phone: Number,
    emailID: {type: String, unique: true},
    publicId: {type: String, unique: true},
    nationalId: {type: String, unique: true},
    nationalIdCard: [String],
    isActive: Boolean
})

const User = model<IUser>('users', userSchema)

export {User, IUser}
