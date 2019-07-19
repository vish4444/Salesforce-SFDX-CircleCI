function scrollToTop(offset, speed) {
    j$('.dataTables_scrollBody').scroll(function() {
        if (j$(this).scrollTop() >= offset) {
            j$('#return-to-top').css('top' , j$(this).offset().top+270);
            j$('#return-to-top').fadeIn(speed);
        } else {
            j$('#return-to-top').fadeOut(speed);
        }
    });
    j$('#return-to-top').click(function() {
        j$('.dataTables_scrollBody').animate({
            scrollTop : 0
        }, 500);
    });
}