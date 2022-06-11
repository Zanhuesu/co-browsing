$(document).ready(function () {
  var socket = io.connect('<%url_base%>');
  socket.on('jump', function (url) {
    $('#direction').val(url);
    $('#contents').attr('src', url);
  });
  $('#contents').load(function () {
    var src_iframe = $('#contents').prop('src'),
      url_input = $('#direction').val();
    // The src property is not refreshed
    if (src_iframe && (src_iframe != '') && (src_iframe != url_input)) {
      $('#direction').val(src_iframe);
      socket.emit('jump', src_iframe);
    }
  });
  $('#direction').keypress(function (e) {
    //When you press ENTER
    if (e.which == 13) {
      var dir = $('#direction').val();
      if (dir.indexOf('//') < 0) $('#direction').val('http://' + dir);
      socket.emit('jump', $('#direction').val());
    }
  });
  $('#direction').focus(function () {
    $(this).fadeTo('slow', 1);
  });
  $('#direction').blur(function () {
    $(this).fadeTo('slow', 0.3);
  });
  $('#direction').focus();
});