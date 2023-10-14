import {Request, Response} from "express";
import {RequestModel} from "../models/request.model";


const getAllRequests = (req: Request, res: Response) => {
    RequestModel.find()
        .then(r => {
            res.send({data: r})
        })
        .catch(err => {
            res.status(500)
                .send({data: err})
        })
}

const updateRequest = (req: Request, res: Response) => {
    const {id, status} = req.body
    RequestModel.updateOne({_id: id}, {$set: {status: status}})
        .then(r => {
            res.send({data: r})
        })
        .catch(err => {
            res.send({err})
        })
}

const deleteRequest = (req: Request, res: Response) => {
    const {id} = req.params
    RequestModel.deleteOne({_id: id})
        .then(r => {
            res.send({data: r})
        })
        .catch(err => {
            res.send({err})
        })
}

const getUserPendingRequests = (req: Request, res: Response) => {
    const {id} = req.params

    RequestModel.find({approver: id})
        .then(r => {
            res.send({data: r})
        })
        .catch(err => {
            res.status(500)
                .send({data: err})
        })
}

const newRequest = (user: any, approver: string, land: any, biddingPrice: string | null, type: number): Promise<any> => {
    return new Promise((res, rej) => {
        const request = new RequestModel({
            user: user,
            land: land,
            type: type,
            status: 0,
            date: new Date().getTime().toString(),
            approver: approver,
            biddingPrice: biddingPrice
        })
        request.save()
            .then((r) => {
                res(r);
            })
            .catch(err => {
                rej(err)
            })
    })
}

export {newRequest, getAllRequests, updateRequest, getUserPendingRequests, deleteRequest}
