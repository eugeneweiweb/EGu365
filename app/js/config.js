require.config({
	baseUrl:"/",

	paths:{
		"jquery":"libs/jquery/jquery-1.11.3",
		"header":"module/header",
		"footer":"module/footer",
		"bootstrap":"libs/boootstrap/js/bootstrap",
		"reset":"module/reset",
		"template":"libs/template-web",
		"cookie":"libs/jquery.cookie",
		"prolist":"module/prolist"
	},

	shim:{
		"bootstrap":{
			deps:["jquery"]
		}
	}
})