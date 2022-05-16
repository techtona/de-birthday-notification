import logger from "../../../configs/logger"
import express from "express"
import User from "../../database/postgres/models/user"

const index = async (req : express.Request, res: express.Response) => {
    try {
        let users = await User.findAll({})
        return res.json({
            message : users
        })
    }catch (e){
        throw Error(e)
    }
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
            date_of_birth : new Date(req.body.date_of_birth),
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
    let user = await User.findOne({
        where : {
            id : req.params.id
        }
    })
    if (!user)
        return res.json({
            message : "User not found"
        })

    try{
        await user.destroy()
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
    try{
        let user = await User.findByPk(req.params.id)
        if (!user)
            return res.json({
                message : "User not found"
        })

        let data = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            date_of_birth : new Date(req.body.date_of_birth),
            address : req.body.address,
            timezone : req.body.timezone
        }
        await user.update(data)
    }catch (e){
        console.log(e);
    }
    return res.json({
        message : "User has been updated"
    })
}

export default {index, store, destroy, update}