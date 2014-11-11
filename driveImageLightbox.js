/*

  Drive Image Lightbox

  Extends image Lighbox plugin to add UI elements for navigation

*/


(function($){
  $.fn.extend({
    driveImageLightbox: function(){
      var imageLightbox = this;

      var popupGallery = {
   
        init : function(selector){
          var self = this;
          
          self.cf = {};
          self.cf.close = $('<span class="popup-close">&times;</span>');
          self.cf.next  = $('<span class="popup-next">&rarr;</span>');
          self.cf.prev  = $('<span class="popup-prev">&larr;</span>');
          self.cf.nav   = $('<div class="popup-nav"></div>');
          
          self.instance     = imageLightbox.imageLightbox({
            onStart : function(){ self.addControls() },
            onEnd   : function(){ self.removeControls() }
          });
          
          self.instance.on('click',function(){
            self.current = $(this).index();
          })
          
          self.instance.each(function(){
            var navItem = $('<span class="popup-nav-item"><span>').appendTo(self.cf.nav);
          }); 
              
        }, 
        addControls: function(){
          
          this.cf.close.appendTo('body');
          this.cf.prev.appendTo('body');
          this.cf.next.appendTo('body');
          this.cf.nav.appendTo('body');
          
          this.setArrows();
          this.setNav();
          
        },
        removeControls: function(){
          this.cf.close.remove();
          this.cf.next.remove();
          this.cf.prev.remove();
          this.cf.nav.remove();
        },
        getCurrentIndex : function(){
         
          var $target = this.instance.filter('[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
              index     = $target.index(this.instance); 

          return index;
          
        },
        setArrows : function(){
          var self = this;
          
          self.cf.prev.on('click',function(e){
            
            if(self.current === 0 ){
              self.instance.switchImageLightbox(self.instance.length - 1)
              self.current = self.instance.length -1;
             
            } else {
              self.instance.switchImageLightbox(self.current - 1);
              self.current--;
            }
            
            self.setNavItemActive(self.current);
            
            return false;
            
          });
          
          self.cf.next.on('click',function(e){
            
            if(self.current === (self.instance.length - 1) ){
              self.instance.switchImageLightbox(0)
              self.current = 0;
            } else {
              self.instance.switchImageLightbox(self.current + 1);
              self.current++;
            }
            
            self.setNavItemActive(self.current);
            
            return false;
            
          });
          
        },
        setNavItemActive : function(i){
          
          navItems = this.cf.nav.find('.popup-nav-item');
          
          navItems.removeClass('active');
          navItems.eq(i).addClass('active');
          
        },
        setNav    : function(){
          
          var self = this;
          
          self.setNavItemActive(self.current);
          
          self.cf.nav.on('click', '.popup-nav-item', function(){
            
            self.cf.nav.find('.popup-nav-item').removeClass('active');
            
            var index = $(this).index();
            
            if(self.current != index){
              self.instance.switchImageLightbox(index);
              self.current = index;  
              self.setNavItemActive(self.current);
            }
            
            return false;
          })
                
        }

      }
    }
  })

})(jQuery)

