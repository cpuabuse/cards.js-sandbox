var url="/me/hello/";

var path={
	"/":{
		test:{
			
		}
	}
}

/*
	NOTE: Order is important. Using a statically assigned array length variable as an index while splicing, order is important
	Remove extra array members.
*/
{
	// Define array
	var pathArray = url.split("/");

	// Cache length
	let pathArrayLength = pathArray.length;

	// Ensure that there is always a "/" at the beginning
	if((pathArrayLength < 2) || (pathArray[0] != "")){
		throw 400; // Bad request, whatever
	}

	// Remove the last space is present; Array length is guaranteed to be >= 2 
	if(pathArray[pathArrayLength - 1] == ""){
		pathArray.splice(pathArrayLength - 1 , 1);
	}

	// Remove empty space from splice of first "/"; The first array element is guaranteed to be empty
	pathArray.splice(0, 1);

	console.log(pathArray);
}