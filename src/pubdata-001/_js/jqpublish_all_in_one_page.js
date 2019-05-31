$(document).ready(function(){
    change_a_href("../060_references/tables/",
                "./060_references/tables/");
				
	change_a_href_Left("/pubdata/",
                       "../pubdata/");
	
	
    change_a_href_target_blank_and_check_exist();
});

function change_a_href(old,newstr){
	$("#dbg").append("<hr/>change_a_href<br/>");
	$("a").each(function(){
		var shref = $(this).attr("href");
				
		if(shref && shref.length>0){
			$(this).attr("target","_blank");
		}		
		if(shref && shref.indexOf(old)===0){
			var res = shref.replace(old, newstr);
			//alert(res);
			$("#dbg").append(shref+"<br/>");
			$("#dbg").append(res+"<br/>");
			$("#dbg").append("<br/>");
			$(this).attr("href", res);			
		}

	});
}
////for all in one php.
function change_a_href_Left(old,newstr){
	$("#dbg").append("<hr/>change_a_href_Left<br/>");
	$("a").each(function(){
		var shref = $(this).attr("href");
				
		if(shref && shref.length>0){
			var ipos=shref.indexOf(old);
			if(ipos>=0 ){
				var str=shref.substr(ipos);
				str = str.replace(old, newstr);
				$(this).attr("href",str);
			}
			
			$(this).attr("target","_blank");
		}
	});
}
	

function change_a_href_target_blank_and_check_exist(){
	$("#dbg").append("<hr/>change_a_href_target_blank_and_check_exist<br/>");
	var idx=0;
	$("a").each(function(){
		var shref = $(this).attr("href");	
		var txt = $(this).text();
		if(shref && shref.length>0){
			if("#" != shref[0]){
				idx++;
				var _TextExist_ = "_TextExist_"+idx;
				$(this).attr("target","_blank");
				
				var testlink="<a target='_blank' href='";
				testlink+=shref;
				testlink+="' id='"+ _TextExist_ + "' ";
				testlink+=">"+txt;
				testlink+="<br/>"+shref+"</a>";
				
				$("#dbg").append("["+idx +"] "+testlink+"<br/>");	
				
				
				//detect url existance
				$.ajax({
					type: 'HEAD',
					url: shref,					
					success: function() {
							// page exists
							$("#"+_TextExist_).html("ok");
					},
					error: function(err) {
							// page does not exist
							$("#"+_TextExist_).css("color","red").append("{"+ err+ "}");
					}
				});


				
			}

		}
	});
	
	//check_all_img();
}


function check_all_img(){
	$("#dbg").append("<hr/>check_all_img:<br/>");
	var idx=0;
	$("img").each(function(){
		var shref = $(this).attr("src");	
		if(shref && shref.length>0){
			if("#" != shref[0]){
				idx++;
				
				var testlink="<img src='";
				testlink+=shref;
				testlink+="'>"+shref+"</img>";
				
				$("#dbg").append("["+idx +"] "+testlink+"<br/>");				
			}

		}
	});
}