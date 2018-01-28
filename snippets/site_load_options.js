const fs=require('fs');

// Returns site-specific data
function site_load(){
    fs.readFile('site_options.json',function (err,data){
        if (err){
            throw err;
        } else {
            return JSON.parse(data);
        }
    })
}