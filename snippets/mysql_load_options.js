const fs=require('fs');

// Returns SQL data & login credentials
function sql_load(){
    fs.readFile('sql_options.JSON',function (err,data){
        if (err){
            throw err;
        } else {
            return JSON.parse(data);
        }
    })
} 