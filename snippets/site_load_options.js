const fs=require('fs');

// Returns SQL data & login credentials
function site_load(){
    fs.readFile('site_options.json',function (err,data){
        if (err){
            throw err;
        } else {
            return JSON.parse(data);
        }
    })
}