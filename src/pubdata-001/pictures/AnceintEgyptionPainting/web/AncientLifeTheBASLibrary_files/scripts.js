$(function(){
  $('a.image img').tooltip();
  $('.carousel').carousel();
  
  $('#frmSiteSearch').submit(function(){
    var pub    = $('#publication').val();
    var volume = $('#QuickVolume').val();
    var issue  = $('#QuickIssue').val();
    $(this).attr('action', "/publication.asp?PubID=" + pub + "&Volume=" + volume + "&Issue=" + issue);
  });
});