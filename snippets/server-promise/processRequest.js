async function processRequest(request){
	try{
		await requestFormatter;
		await dataProcessing;
		await responseFormatter;
		
	} catch (errorCode){

	}finally{
		await processResponse;
	}

}