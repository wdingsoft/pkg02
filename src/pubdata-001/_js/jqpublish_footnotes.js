$(document).ready(function(){

	
  var anIndx=0;
  $("a").each(function(i){
    var href=$(this).attr("href");
    if(!!href){
		var n = href.indexOf("#");    
		if( 0===n){
			var name = href.substring(1);
			anIndx+=1;
			$(this).text(anIndx);
			//$("a[name='" + name +"']").text("["+anIndx+"]");
			$("a[name='" + name +"']").text(" ").attr("title", href);
		}
    }
    
  });
  
  ////key press 'e', to edit the page.
  $("body").keypress(function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    
    if(code == 101) { //Enter keycode E
        //alert(code);
        //alert(document.URL);
        var wroot="wroot";
       
        var url =""+document.URL;
        var n=url.search(wroot);
        var url2= url.substring(0,n);
        //alert(url2);
        url2+= wroot+"/tool/_edit/explore/Work.htm?filename=";
        
        var url3 = url.substring(n);
        url3 = "/var/www/html/lamp/" + url3 ;
        
        var urlOpen = url2 + url3;

        var bodyHeight = $("body").height();
        //alert("bodyHeight="+bodyHeight);

        window.open(urlOpen);
       //e.preventDefault();
       //Do something
     }

    if(code == 102) { //Enter keycode File
        var bodyHeight = $(document).height();
        var fileHeight="<a style='position=fix; left-margin=0px'>h="+bodyHeight + ",w=" + $("body").width() + ",</a>";
        $("body").append(fileHeight);

        //alert("bodyHeight="+bodyHeight + ",w=" + $(document).width() );
     }



  });
  
  
  
  
  //////////////////////////////////////////
  //foot notes automation
  var NoteArr=[];
  var NOTE2IDX = new Object();
  $("ol li a[name]").each(function(i){
    var snme=$(this).attr("name");
    //alert(i+"="+s);
    var idx = 1 + i;
	if(!!NOTE2IDX[snme]){
		alert(snme+": was found duplicated. please correct it. at idx=" + idx);
		var pos = NoteArr.indexOf(snme);
		console.log(" + + + duplicated to footnote: pos="+pos+",name="+snme);
	}
	NoteArr.push(snme);
    NOTE2IDX[snme]=""+idx;
	$(this).closest( "li" ).attr("value",idx);
	var txt = $(this).closest( "li" ).text();
	console.log("footnote: idx="+idx+",name="+snme+",txt="+txt);
  });
  
  src = $("body").html();
  //alert(src); //original letters only reg: /(\[\w+\])/gm 
  src = src.replace(/(\[[\w\s0-9\.\:\-]+\])/gm, function($1){
    var s1=$1;
    var s2=s1.replace(/\[|\]/g,'');
    var sidx = NOTE2IDX[s2];
    if(undefined === sidx ){
        alert("find ERRORS: undfined "+ s2);
        sidx="<font color='red'>ERRORS:"+s1+"</font>";
    }
    return "<sup>[<a href='#"+s2+"'>"+sidx+"</a>]</sup>";
    });
  $("body").html(src);	
	////////////////////////////
	
	
  
  //////////////////////////
  //make section number
//  var sectionId=0;
//  var RomaNum=["I","II","III","IV","V","VI","VII","VIII","VIIII"];
//  $("h1").each(function(i){
//	  var txt = $(this).text();
//	  var pos = txt.indexOf("Sample Article");
//	  if(pos>=0){
//		//ignore it  
//		console.log("ignore it");
//	  }
//	  else{
//		  var iR=RomaNum[sectionId];
//		  sectionId++;	
//		  var sank="<a name='Sect"+sectionId+"'>"+iR+". </a>"+txt;
//		  $(this).html(sank).attr("name", "Sect"+sectionId);
//
//		  console.log(sank);
//	  }
//	  
//  });
  ////////////////////////////
  //alert(src);
  
	$("#toc li").click(function(){
		//var idx = $(this).index();
		//idx = 1+ parseInt(idx);
		//console.log("li idx="+idx);
		//var  loc=$("#TableOfContents").attr("title");
		//if("local"===loc){
		//	$(this).children("a").attr("href","#Sect"+idx);
		//}		
	});
	
	$("#TableOfContents").click(function(){
		console.log("toc="+$(this).text());
		$(this).attr("title","local");
		change_toc_href_into_local_reverse();
	});  
  
  change_toc_href_into_local();
  enum_h1_h2();
  
  change_a_href_060_references();
  change_a_href_target_blank();

//////////////////////////////////////////
  
  
});
function change_toc_href_into_local(){
	$("#toc").children("li").each(function(i){
		var idx = $(this).index();
		idx = 1+ parseInt(idx);
		var str = $(this).text();
		console.log("li idx="+idx+",str="+str);
		//var  loc=$("#TableOfContents").attr("title");
		var shref = $(this).children("a").attr("href");
		$(this).children("a").attr("shref",shref);
		$(this).children("a").attr("href","#Sect"+idx);
		
		$(this).find("ol").children().each(function(i2){
			i2+=1;
			var shref = $(this).children("a").attr("href");
			$(this).children("a").attr("shref",shref);
			$(this).children("a").attr("href","#Sect_"+idx+"_"+i2);
		})	
	});	
}
function change_toc_href_into_local_reverse(){
	$("#toc li a").each(function(i){
		var shref = $(this).attr("shref");
		if(shref.length>0){
			$(this).attr("href",shref);	 
		}
			
	});	
}
function enum_h1_h2(){
	var h1Idx=0;
	var h2Idx=0;
	var h3Idx=0;
	$( ":header" ).each(function(i){
		var txt = $(this).text();
		txt=$.trim(txt);
		if(h1_h2_h3_Validate(txt)){
			var tagname=$(this).prop("tagName");
			tagname=tagname.toLowerCase();
			if("h1"===tagname){
				h1Idx++;
				h2Idx=0;
				var RomaNum=["","I","II","III","IV","V","VI","VII","VIII","VIIII"];
				var iR=RomaNum[h1Idx];				  
				var sank="<a name='Sect"+h1Idx+"'>"+iR+". </a>"+txt;
				$(this).html(sank).attr("name", "Sect"+h1Idx);

			}
			if("h2"===tagname){
				h2Idx++;
				h3Idx=0;
				var chp="<a name='Sect_"+h1Idx+"_"+h2Idx+"'>"+h1Idx+"-"+h2Idx+". </a>"+txt;
				$(this).html(chp);
			}			
		}

		console.log(tagname+":header="+txt);
	})
}
function h1_h2_h3_Validate(txt){
	var pos = txt.indexOf("Sample Article");
	if(pos<0){
		return true;
	}
	return false;
}

function change_href_into_localzzzz(){
	$("#toc li").each(function(){
		var idx = $(this).index();
		idx = 1+ parseInt(idx);
		console.log("li idx="+idx);
		//var  loc=$("#TableOfContents").attr("title");
		//if("local"===loc){
			$(this).children("a").attr("href","#Sect"+idx);
		//}		
	});	
}


////for all in one php.
function change_a_href_060_references(){
	var old="../060_references/tables/";
	var newstr="./060_references/tables/"
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

function change_a_href_target_blank(){
	$("#dbg").append("<hr/>change_a_href_target_blank<br/>");
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
					error: function() {
							// page does not exist
							$("#"+_TextExist_).css("color","red");
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