function search()
	{
	var searchString=$('#searchText').val().toLowerCase();
	var includeComments="";
	if($('#commentsCheck').is(':checked')){
		includeComments="&com=true"
	}
	window.location.href ="search.html?q="+searchString+includeComments;
	}
var QueryString = function () {
            // This function is anonymous, is executed immediately and
            // the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        }();
		Handlebars.registerHelper('dateFormat', function (context, block) {
                if (window.moment) {
                    var f = block.hash.format || "MMM Do, YYYY";
                    return moment(context).format(f);
                } else {
                    return context;   //  moment plugin not available. return data as is.
                };
            });
			Handlebars.registerHelper('avatar', function (context) {
                 return "http://graph.facebook.com/"+context+"/picture";
			});

			Handlebars.registerHelper('urlify', function (context) {
				context=Handlebars.Utils.escapeExpression(context);
			    var urlRegex = /(https?:\/\/[^\s]+)/g;
			    var result= context.replace(urlRegex, function (url) {
					var result='<a href="' + url + '">' + url + '</a>';
					return result;
			    }).replace(/\n/g,'<br/>');
				if(isArabic(result))
				{
				return '<div class="rtl">'+result+'</div>';
				}
				return result;
			});
		function isArabic(context)
		{
		var arabic = /[\u0600-\u06FF]/;
		return arabic.test(context); 
		}