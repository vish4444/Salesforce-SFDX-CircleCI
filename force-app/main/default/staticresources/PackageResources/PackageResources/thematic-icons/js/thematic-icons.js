

    function initClipboard() {
        var clipboard = new ClipboardJS('.slds-box');
        return clipboard;
    }

    function setTooltip() {
        j$('.slds-box').each(function(){

            j$(this).data('title',j$(this).attr('title'));
            j$(this).removeAttr('title');

        });

        j$('.slds-box').click(function(){

            j$(this).mouseover();
            mouseover(this);

            // after a slight 2 millisecond fade, fade out the tooltip for 2 second
            j$(this).next().animate({opacity: 1},{duration: 200, complete: function(){
                j$(this).fadeOut(2000);
            }});

        });

        /**
         * Remove the tooltip on div mouseout
         */
        j$('.slds-box').mouseout(function(){

            j$(this).next('.tooltip').remove();

        });
    }

    /**
     * when divs are mouseover-ed create an element with class tooltip and set its position
     */
    function mouseover(element) {
        // first remove all existing abbreviation tooltips
        j$('.slds-box').next('.tooltip').remove();

        // create the tooltip
        j$(element).after('<span class="tooltip">copied</span>');

        // position the position of tooltip in respect to position of the div
        var left = j$(element).position().left;
        var top = j$(element).position().top;
        j$(element).next().css('left',left);
        j$(element).next().css('top',top);
    }