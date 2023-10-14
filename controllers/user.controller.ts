import {Request, Response} from "express";

import {User} from '../models/user.model'

const getAllUsers = async (req: Request, res: Response) => {
    await User.find({})
        .then((u) =>
            res.status(200)
                .send({data: u}))
        .catch((err) => res.send({msg: err.message}))
}

const createUser = async (req: Request, res: Response) => {
    const {name, emailID, publicId, phone, nationalId} = req.body

    console.log(phone);

    let file = req.files as Express.Multer.File[]
    let images: string[] = []

    file.forEach((f: Express.Multer.File) => {
        images.push(f.filename as string)
    });


    // validate request
    if (!name) {
        return res.status(204)
            .send({msg: 'name field should not be empty'})
    }
    if (!emailID) {
        return res.status(204)
            .send({msg: 'email field should not be empty'})
    }
    if (!phone) {
        return res.status(204)
            .send({msg: 'phone field should not be empty'})
    }
    if (!publicId) {
        return res.status(204)
            .send({msg: 'publicId field should not be empty'})
    }
    if (!nationalId) {
        return res.status(204)
            .send({msg: 'nationalId field should not be empty'})
    }

    const user = new User({
        name: name,
        emailID: emailID,
        phone: phone,
        publicId: publicId,
        nationalId: nationalId, nationalIdCard: images
    })

    await user.save()
        .then((u) => {
            res.status(201)
                .send({msg: 'user created', data: u})
        })
        .catch((err) => {
            res.status(500)
                .send({msg: err.message})
        })
}

export const getUserById = (req: Request, res: Response) => {
    const {id} = req.params
    getUser(id).then(r => {
        res.send(r)
    }).catch(err => res.status(500).send(err))
}

const getUser = (pId: string): Promise<any> => {
    return new Promise((res, rej) => {
        User.find({publicId: pId})
            .then(r => {
                res(r)
            })
            .catch(err => {
                rej(err)
            })
    })
}

export {getUser, createUser, getAllUsers}
