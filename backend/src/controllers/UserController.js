const User = require('../models/User')

class UserController{
    async showAll(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        try{
            const users = await User.findAll()
            res.json(users)
        }catch(e){
            res.json(e)
        }
    }
    async showUser(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        var id = req.body.id;
        try{
            const User = await User.showUser(id)
            if(!User){
                return res.json({msg:"Usuario inexistente"})
            }
            return res.json(User)
        }catch(e){}

    }
    async criaUser(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        const user =await  User.store(req.body)
        
        res.json(user)
    }
    async updateUser(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        try{
            const user = await User.updateUser(req.body)
            if(!user){
                return res.json({msg:'usuario inexistente'})
            }
            res.json(user)
        } catch(e){
            console.log(e)
        }
    }
    async deleteUser(req,res){
        res.header("Access-Control-Allow_Origin", "*");
        var id = req.body.id;
        try{
            const userDeletado = await User.deleteUser(id)
            console.log(userDeletado)
            if(!userDeletado){
                return res.json({msg:'usuario inexistente'})
            }
            res.json(userDeletado)
        }catch(e){console.log(e)}
    }
}
    exports.teste=function(){

    }
module.exports = new UserController