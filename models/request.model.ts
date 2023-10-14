import {model, Schema} from "mongoose";
import {IUser} from "./user.model";
import {ILand} from "./land.model";

interface IRequest extends Document {
    id?: number;
    user: IUser;
    land: ILand;
    date: string;
    status: number;
    type: number;
    approver: string;
    biddingPrice?: string | null;
}

/*
* 0 : request created
* 1 : request accepted
* 2 : request rejected
* 3 : request confirmed
* */

const RequestSchema: Schema = new Schema<IRequest>({
    user: Schema.Types.Mixed,
    land: Schema.Types.Mixed,
    date: String,
    status: Number,
    type: Number,
    approver: String, biddingPrice: String
})

const RequestModel = model<IRequest>('requests', RequestSchema)

export {RequestModel, IRequest}
