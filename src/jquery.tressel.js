/*
    Tressel.js
    Copyright (c) 2013 Simon Downes - http://simondownes.co.uk
    License: http://www.opensource.org/licenses/mit-license.php
*/
(function( $ ){

    var config = {};

    var methods = {
        init: function( options ) { 
            
            if( this.hasClass('tressel') )
                return this;

            this
                .addClass('tressel')
                .find('li').each(function() {
                    
                    $this = $(this);

                    // get the DOM node containing the text of the list item
                    var text = $this.contents().filter(function() {
                        return this.nodeType == 3;
                    });
                    
                    // wrap the text in an item span
                    var item = $('<span class="item"></span>')
                        .text($.trim(text.text()))
                        .append($('<span class="checkbox"></span>'));
                    
                    // remove the existing text node and insert our wrapped version
                    text.remove();                    
                    $this.prepend(item);
                    
                    // if we have child nodes we need an expander button
                    if( $this.children('ul').length ) {
                        var expander = $('<span class="expander"></span>');
                        expander.on('click', function( event ) {
                            $(this).parent().tressel('expand');
                            event.stopPropagation();
                        });
                        item.prepend(expander);
                        $this.addClass('parent');
                    }
                    
                    // clicking on an item selects it
                    item.on('click', function( event ){
                        $(this).parent().tressel('select');
                        event.stopPropagation();
                    });
                        
                });

            return this;

        },
        
        select: function() {
            return this.toggleClass('selected')
        },
        
        expand: function() { 
            this.children('.expander').toggleClass('hide', this.next().toggle().is(':visible'));
            return this;
        },
        
        selected: function( use_data ) {
            var selected  = [];
            var attribute = use_data ? 'data-tressel' : 'id';
            this.find('.selected').each(function() {
                selected.push( $(this).attr(attribute) );
            });
            return selected.filter(
                function(a) {
                        return !(a === "" || typeof a == "undefined" || a === null);
                }
            );
        },

    };

    $.fn.tressel = function( method ) {

        // Method calling logic
        if( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if( typeof method === 'object' || ! method ) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' +  method + ' does not exist on jQuery.tooltip');
        }    

    };

})( jQuery );