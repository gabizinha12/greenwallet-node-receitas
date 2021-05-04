
const ValidatorMiddleware = async (req, res, next) =>{
    //  create config file with all the endpoints and its needed params?
    let errorJson = {
        message: 'Error on ',
        errors: {
            missingParams:[]
        }
    }
    switch (req.method){
        case "GET":{
            break
        }
        case "POST":{
            const neededParams = [
                "description",
                "value",
                "due_date",
                "category_id",
                "user_id",
                "is_fixed"
            ]
            const checkParams = checkHasParams({neededParams, reqParams: req.body})
            if(checkParams.hasError){
                errorJson.errors.missingParams = checkParams.errors
                errorJson.message += 'create receipt'
            }
            break
        }
        case "PUT":{
            const neededParams = [
                "description",
                "value",
                "due_date",
                "category_id",
                "user_id",
                "is_fixed"
            ]
            const checkParams = checkHasParams({neededParams, reqParams: req.body})
            if(checkParams.hasError){
                errorJson.errors.missingParams = checkParams.errors
                errorJson.message += 'create receipt'
            }
            break
        }
        case "DELETE":{
            console.log(req.params)
            //validateDeleteReceipt(errorJson, req.body)
            break
        }
    }
    if(errorJson.errors.missingParams.length >= 1){
        return res.status(422).json(errorJson)
    }
    
    return res.status(200)
    //next()
}

const checkHasParams = ({neededParams, reqParams}) =>{
    let res = {
        errors: [],
        hasError: false
    }
    for(p of neededParams){
        if(typeof reqParams[p] == 'undefined' || reqParams[p] == null){
            res.errors.push(p)
            res.hasError = true
        }
    }
    return res
}

module.exports = {
    ValidatorMiddleware
}