$(function(){

  // Table of Contents
  if($(".mainText h3").size() > 0){
    var elm = $("<ul class='list-unstyled'></ul>");
    $(".mainText h3").each(function(i) {
      var current = $(this);
      current.attr("id", "chapter-" + i);
      elm.append("<li><a href='#chapter-" + i + "'>" + current.html() + "</a></li>");
    });
    $("#table-of-contents")
      .append(elm);
    return false;
  }
  else {
    $("#table-of-contents").css("display","none");
  }

  // Category Menu
  var mainCategory = $(".mainText > div > div > .mainList > li");
  var mainCategoryAnchors = mainCategory.children("a");
  var subCategory = $(".mainText .mainList ul li");
  var subCategoryAnchors = subCategory.find("a");
  subCategory.hide();
  mainCategoryAnchors.click(function(event) {
    event.preventDefault();
    var currentSubMenu = $("+ ul li",this);
    subCategory.hide();
    currentSubMenu.show();
  });

});

// Paragraph Mark
$(function(){
  $(".mainText article p:contains('.')").addClass("mark");
  $(".mainText article p:contains('Text Sources:')").removeClass("mark");
  $(".mainText article p > strong").parent("p").removeClass("mark");
  $(".mainText article p:empty").removeClass("mark");
});

// Quotation Replace
/*
$(function(){
  $('.js-replace').each(function(){
    var txt = $(this).html();
    $(this).html(
      txt
        .replace(/[^A-Za-z]s /g,"\'s ") // Mike's
        .replace(/n[^A-Za-z]t /g,"n\'t ") // isn't
        .replace(/[^A-Za-z]ve /g,"\'ve ") // I've
        .replace(/[^A-Za-z]ll /g,"\'ll ") // We'll
        .replace(/[^A-Za-z]re /g,"\'re ") // We're
        .replace(/e[^A-Za-z]d/g,"e\'d") // e'd
        .replace(/ I[^A-Za-z]m /g," I\'m ") // I'm

        .replace(/\.[^\s\<\>\"\'A-Za-z0-9_]/g,"\.\"")
        .replace(/\,[^\s\<\>\"\'A-Za-z0-9_]/g,"\,\"")

    );
  });
});
*/

/*
$(function(){
  $('.js-replace').each(function(){
    var txt = $(this).html();
    $(this).html(
      txt
        .replace(/ isn[^a-z]t /g," isn't ")
        .replace(/ don[^a-z]t /g," don't ")
        .replace(/ dosen[^a-z]t /g," dosen't ")
        .replace(/ won[^a-z]t /g," won't ")
        .replace(/ I[^a-z]ve /g," I've ")
        .replace(/ Xi[^a-z]s /g," Xi's ")
        .replace(/ Mao[^a-z]s /g," Mao's ")
        .replace(/ Japan[^a-z]s /g," Japan's ")
        .replace(/ China[^a-z]s /g," China's ")
    );
  });
});
*/