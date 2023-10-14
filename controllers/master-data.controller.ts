import {MasterData} from "../models/master-data.model";
import {Request, Response} from "express";

const DummyMasterData = [
    {
        propertyId: 'P100100',
        village: 'village 1',
        division: 'division 1',
        district: 'district 1',
        state: 'state 1',
        ownerNationalId: '12345678',
        ownerName: 'User 1',
        ownerPhone: '9874563210',
        ownerEmail: 'user1@mail.com'
    },
    {
        propertyId: 'P100101',
        village: 'village 1',
        division: 'division 1',
        district: 'district 1',
        state: 'state 1',
        ownerNationalId: '12345678',
        ownerName: 'User 2',
        ownerPhone: '9874563211',
        ownerEmail: 'user2@mail.com'
    },
    {
        propertyId: 'P100102',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
    {
        propertyId: 'P100103',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
    {
        propertyId: 'P100104',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
    {
        propertyId: 'P100105',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
    {
        propertyId: 'P100106',
        village: 'village 1',
        division: 'division 1',
        district: 'district 1',
        state: 'state 1',
        ownerNationalId: '12345678',
        ownerName: 'User 1',
        ownerPhone: '9874563210',
        ownerEmail: 'user1@mail.com'
    },
    {
        propertyId: 'P100107',
        village: 'village 1',
        division: 'division 1',
        district: 'district 1',
        state: 'state 1',
        ownerNationalId: '12345678',
        ownerName: 'User 2',
        ownerPhone: '9874563211',
        ownerEmail: 'user2@mail.com'
    },
    {
        propertyId: 'P100108',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
    {
        propertyId: 'P100109',
        village: 'village 3',
        division: 'division 2',
        district: 'district 1',
        state: 'state 3',
        ownerNationalId: '12345675',
        ownerName: 'User 4',
        ownerPhone: '9874563215',
        ownerEmail: 'user4@mail.com'
    },
]

export const getAllMasterData = (req: Request, res: Response) => {
    MasterData.find({})
        .then((r) => res.status(200)
            .send(r))
        .catch((err) => res.status(500)
            .send({data: err.message}))
}

export const initMasterData = () => {
    MasterData.find({}).then((r) => {
        if (r.length <= 1) {
            let docs = []
            for (const doc of DummyMasterData) {
                new MasterData(
                    {
                        propertyId: doc.propertyId,
                        village: doc.village,
                        division: doc.village,
                        district: doc.district,
                        state: doc.state,
                        ownerNationalId: doc.ownerNationalId,
                        ownerName: doc.ownerName,
                        ownerPhone: doc.ownerPhone,
                        ownerEmail: doc.ownerEmail
                    }).save()
            }
            console.log('inserted dummy master data')
        }
    })
}
