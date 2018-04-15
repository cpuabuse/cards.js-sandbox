var resources={
    index:{
        main : "index.html"
    },
    resource1:{}
}

var resourceArray={
    "/resource1" : "resource1",
    "/resource2" : "resource2",
    "/" : "index"
};

// Returns the resource object according to user input path
var getResourceByPath = function (path, resourceArray){
    // Checks user input
    if (!resourceArray.hasOwnProperty(path)) {
        throw 404;
    }
    
    // Checks internal application integrity
    var resourceKey = resourceArray[path];
    if (!resources.hasOwnProperty(resourceKey)){
        throw 500;
    }
    
    return resourceKey;
}