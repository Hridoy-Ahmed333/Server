import {model, Schema} from "mongoose";

interface IMasterData extends Document {
    propertyId: string
    village: string
    division: string
    district: string
    state: string
    ownerNationalId: string
    ownerName: string
    ownerPhone: number
    ownerEmail: string
}

const masterDataSchema: Schema = new Schema<IMasterData>({
    propertyId: String,
    village: String,
    division: String,
    district: String,
    state: String,
    ownerNationalId: String,
    ownerName: String,
    ownerPhone: Number,
    ownerEmail: String,
})

const MasterData = model<IMasterData>('master-data', masterDataSchema)

export {MasterData, IMasterData}
