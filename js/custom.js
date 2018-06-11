(function($){
  $(document).ready(function(){

    $('.add-note').click(function() {
      var item = '<li class="item">' + $("#set").val() + '</li>';

      if ($('#top').prop('checked') == true) {
        $('.note-list').prepend(item);
      } else {
        $('.note-list').append(item);
      }
      $("#set").val('');
      $('#top').prop('checked', false);
      $('.note-list .actions').remove();
    });

    $(".note-list").on("mouseenter", ".item", function() {

      $(this).append('<div class="actions">' +
        '<button id="up" class="btn btn-warning btn-xs"><i class="fas fa-angle-up"></i></button>' +
        '<button id="down" class="btn btn-info btn-xs"><i class="fas fa-angle-down"></i></button>' +
        '<button id="remove" class="btn btn-danger btn-xs"><i class="far fa-trash-alt"></i></button>' +
        '</div>');

    });

    $(".note-list").on("mouseleave", ".item", function() {
      $(".note-list").find('.actions').remove();
    });

    $(".note-list").on("click", function(event) {
      setTimeout(
        function() {

          var elem = event.target;

          if ($(elem).attr('id') == 'remove') {
            $(elem).parents(".item").remove();
          } else if ($(elem).attr('id') == 'up') {

            var index = $(elem).parents('.actions').parents('.item').index();

            if (index == 0 ) {
              return true;
            } else {
              var currCont = $(elem).parents('.actions').parents('.item').html();
              var prevCont = $('.note-list > .item:nth-child(' + (index) + ')').html();

              $('.note-list > .item:nth-child(' + (index) + ')').html(currCont);
              $('.note-list> .item:nth-child(' + (index + 1) + ')').html(prevCont);
            }

          } else {

            var index = parseInt($(elem).parents('.actions').parents('.item').index()) + 1;
            var summary = $('.note-list > .item').length;

            if (index > summary) {
              return true;
            } else {
              var currCont = $(elem).parents('.actions').parents('.item').html();
              var nextCont = $('.note-list > .item:nth-child(' + (index + 1) + ')').html();

              $('.note-list > .item:nth-child(' + (index + 1) + ')').html(currCont);
              $('.note-list > .item:nth-child(' + (index) + ')').html(nextCont);
            }

          };
          $(".note-list").find('.actions').remove();
        }, 100
      );
    });
  });
})(jQuery);