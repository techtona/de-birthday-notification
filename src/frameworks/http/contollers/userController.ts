import logger from "../../../configs/logger"
import express from "express"
import User from "../../database/mongodb/models/user"

const index = async (req : express.Request, res: express.Response) => {
    let users = await User.find({},{
        first_name : 1,
        last_name : 1,
        date_of_birth : 1,
        address : 1,
        timezone : 1
    })

    return res.json({
        message : users
    })
}

const store = async (req : express.Request, res: express.Response) => {
    if (!req.body.first_name ||
    !req.body.last_name ||
    !req.body.date_of_birth ||
    !req.body.address ||
    !req.body.timezone){
        return res.json({
            message : "first_name, last_name, date_of_birth, address, and timezone are required"
        }).status(400)
    }

    try{
        let data = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            date_of_birth : new Date(req.body.date_of_birth).getTime(),
            address : req.body.address,
            timezone : req.body.timezone
        }
        await User.create(data)
    }catch (e){
        res.json({
            message : e.message
        })
        throw e;
    }

    return res.json({
        message : "User was created"
    })
}

const destroy = async (req : express.Request, res: express.Response) => {
    let user = await User.findOne({_id : req.params.id})
    if (!user)
        return res.json({
            message : "User not found"
        })

    try{
        await User.deleteOne({_id : req.params.id})
    }catch (e){
        throw e;
    }
    return res.json({
        message : "User has been deleted"
    })
}

const update = async (req : express.Request, res: express.Response) => {
    if (!req.body.first_name ||
        !req.body.last_name ||
        !req.body.date_of_birth ||
        !req.body.address ||
        !req.body.timezone){
        return res.json({
            message : "first_name, last_name, date_of_birth, address, and timezone are required"
        }).status(400)
    }

    let user = await User.findOne({_id : req.params.id})
    if (!user)
        return res.json({
            message : "User not found"
        })

    try{
        let data = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            date_of_birth : new Date(req.body.date_of_birth).getTime(),
            address : req.body.address,
            timezone : req.body.timezone
        }
        await User.updateOne({_id : req.params.id},data)
    }catch (e){
        throw e;
    }
    return res.json({
        message : "User has been updated"
    })
}

export default {index, store, destroy, update}