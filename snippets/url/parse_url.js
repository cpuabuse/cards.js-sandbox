var url="/me/hello/";

var path={
	"/":{
		test:{
			
		}
	}
}

var testo ={
	"":"hello"
}
console.log(testo);

path_array = url.split("/");

console.log(path_array);
console.log(path_array.length);

let pathArrayLength = pathArray.length;

// Ensures that there are no requests without a "/"
path
throw 400; // Bad request

// Ensure that there is always a "/" at the beginning
if((pathArraylength < 2) || (path_array[0] != "")){
	throw 400; // Bad request, whatever
}

/*
	NOTE: Order is important. Using a statically assigned array length variable as an index while splicing, order is important
	Remove extra array members.
*/
{
	// Remove the last space is present; 
	if(path_array[path_array.length -1] == ""){
		path_array.splice(path_array.length -1 , 1);
	}

	// Remove empty space for first "/"
	path_array.splice(0, 1);

	console.log(path_array);
}