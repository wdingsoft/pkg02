$(document).ready(function(){
  var anIndx=0;
  $("a").each(function(i){
    var href=$(this).attr("href");
    if(!!href){
    var n = href.indexOf("#");
    var name = href.substring(1);
    if( 0==n){
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
        //alert(urlOpen);
        window.open(urlOpen);
       //e.preventDefault();
       //Do something
     }
  });
  
  
  
  
  //////////////////////////////////////////
  //foot notes automation
    var NOTE2IDX = new Object();
  $("ol li a[name]").each(function(i){
    var s=$(this).attr("name");
    //alert(i+"="+s);
    var idx = 1 + i;
    NOTE2IDX[s]=""+idx;
  });
  
  
  src = $("body").html();
  //alert(src); //reg: /(\[\w+\])/gm 
  src = src.replace(/(\[[\w\s0-9\:\-]+\])/gm, function($1){
    var s1=$1;
    var s2=s1.replace(/\[|\]/g,'');
    var sidx = NOTE2IDX[s2];
    if(undefined === sidx ){
        alert("err: undfined "+ s2);
        sidx="<font color='red'>"+s1+"</font>";
    }
    return "<sup>[<a href='#"+s2+"'>"+sidx+"</a>]</sup>";
    });
  //alert(src);
  
  $("body").html(src);
//////////////////////////////////////////
  
  
});