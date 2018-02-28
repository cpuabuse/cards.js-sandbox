var d = new Date();
		currentdatetime = d.getHours()+ ":" + d.getMinutes();
		hours = d.getHours();
		nunjucks.render('./templates/angular.njk',{username:"Adrian", datetime:currentdatetime, time:hours}, function(err,result){
			console.log(result);