const ReceiptsService = require('../services/ReceiptsService')

const createReceipt = async (req, res, next) => {
    try{
        //  todo validation on a different folder
        if(!req.body.description || !req.body.value || !req.body.due_date ||! req.body.category_id || !req.body.user_id){
            return res.status(422).send({ message: 'Invalid params!' });
        }

        const status = await ReceiptsService.create(req.body)
        return res.status(status).json({message: 'Request done'})
    }catch(e){
        return res.status(400).json({message: e.message})
    }
}

const editReceipt = async (req, res, next) => {
    try {
        //  todo validation on a different folder
        if(!req.body.description || !req.body.value || !req.body.due_date ||! req.body.category_id || !req.body.user_id || !req.body.is_fixed){
            return res.status(422).send({ message: 'Invalid params!' });
        }

        const update = await ReceiptsService.edit(req.body)
        const status = update.affectedRows == 1 ? 200 : 500 
        return res.status(status).json({ message: "Request done"})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: error })
    }
}

const getReceipts = async (req, res, next) => {
    try{

    }catch(e){
        
    }
}

const deleteReceipt = async (req, res, next) => {
    try{

    }catch(e){
        
    }
}

module.exports = {
    createReceipt,
    editReceipt,
    getReceipts,
    deleteReceipt
}