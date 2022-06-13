
    export function parseErrorObj(errorGroupObj){
        let res = []
        for(const errGroup in errorGroupObj){
            for (const errMsg of errorGroupObj[errGroup]){
                res.push(errMsg)
            }
        }
        return res
    } 
