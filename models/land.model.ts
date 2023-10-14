import {model, Schema} from "mongoose";
import {IUser} from "./user.model";

interface ILand extends Document {
    id?: number;
    token: string;
    owner: IUser;
    propertyId: string;
    division: string;
    district: string;
    state: string;
    landImages: string[];
    village: string
    postOffice: string
    status: boolean
    isForSale: boolean
    price: number
}

const LandSchema: Schema = new Schema<ILand>({
    token: {type: String},
    owner: Schema.Types.Mixed,
    propertyId: String,
    division: String,
    district: String,
    state: String,
    landImages: [String],
    village: String,
    postOffice: String,
    status: Boolean,
    isForSale: Boolean, price: Number
})

const Land = model<ILand>('land', LandSchema)

export {Land, ILand}
