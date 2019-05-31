$(document).ready(function () {
    $('#PubID').change(function () {
        var publication = $('#PubID').val();
        if (publication == 'BSBA') {
            $.getJSON('http://members.bib-arch.org/js/volumesBAR.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].volID + '">' + data[i].volume + '</option>';
                }
                $('select#Volume').find('option').remove().end().append(html);
            });
            $.getJSON('http://members.bib-arch.org/js/datesBAR.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].dateID + '">' + data[i].date + '</option>';
                }
                $('select#Date').find('option').remove().end().append(html);
            });
            $("#method-date").prop('checked', true);
            $('#method-hide').css('display', 'block');
            $('#date-hide').css('display', 'block');
            $('#issue-hide').css('display', 'none');
            $("#Issue").prop('value', "");
        } else if (publication == 'BSBR') {
            $.getJSON('http://members.bib-arch.org/js/volumesBR.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].volID + '">' + data[i].volume + '</option>';
                }
                $('select#Volume').find('option').remove().end().append(html);
            });
            $.getJSON('http://members.bib-arch.org/js/datesBR.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].dateID + '">' + data[i].date + '</option>';
                }
                $('select#Date').find('option').remove().end().append(html);
            });
            $("#method-date").prop('checked', true);
            $('#method-hide').css('display', 'block');
            $('#date-hide').css('display', 'block');
            $('#issue-hide').css('display', 'none');
            $("#Issue").prop('value', "");
        } else if (publication == 'BSAO') {
            $.getJSON('http://members.bib-arch.org/js/volumesAO.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].volID + '">' + data[i].volume + '</option>';
                }
                $('select#Volume').find('option').remove().end().append(html);
            });
            $.getJSON('http://members.bib-arch.org/js/datesAO.js', function (data) {
                var html = '';
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    html += '<option value="' + data[i].dateID + '">' + data[i].date + '</option>';
                }
                $('select#Date').find('option').remove().end().append(html);
            });
            $("#method-date").prop('checked', true);
            $('#method-hide').css('display', 'block');
            $('#date-hide').css('display', 'block');
            $('#issue-hide').css('display', 'none');
            $("#Issue").prop('value', "");
        } else {
            $('#Volume').prop('value', "");
            $("#Issue").prop('value', "");
            $("#Date").prop('value', "");
            $('#method-hide').css('display', 'none');
            $('#issue-hide').css('display', 'none');
            $('#date-hide').css('display', 'none');
        }
    });
    $('#Date').blur(function () {
      var volume = $(this).val();
      var volume = volume.match(/^(\d+)/).slice(1);
      var volume = volume[0];
      var issue  = $(this).val();
      var issue  = issue.match(/(\d+$)/).slice(1);
      var issue  = issue[0];
      $("#Volume").prop('value', volume);
      $("#Issue").prop('value', issue);
    });
    $('input[name=Method]').change(function () {
        if ($(this).val() == 'date') {
            $('#issue-hide').css('display', 'none');
            $('#date-hide').css('display', 'block');
        } else {
            $('#issue-hide').css('display', 'block');
            $('#date-hide').css('display', 'none');
        }
    });
});
