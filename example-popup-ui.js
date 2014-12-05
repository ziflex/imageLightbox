
// Set elements for the popup UI
var popupUI = {
  close   : $('<span class="popup-close">&times;</span>'),
  next    : $('<span class="popup-next ">&rarr;</span>'),
  prev    : $('<span class="popup-prev ">&larr;</span>'),
  nav     : $('<div class="popup-nav"></div>'),
  overlay : $('<div class="popup-overlay"></div>')
};

// Trigger close, and prevent propagation 
// so no click events bubble up
function quitPopup(e,instance){
  e.preventDefault();
  e.stopImmediatePropagation();
  instance.quitImageLightbox();
}

// Switch to previous image, 
// if it's the first then back to the last
function routePrev(self){
  if(self.current === 0 ){
    self.switchImageLightbox(self.length - 1);
    self.current = self.length -1;
   
  } else {
    self.switchImageLightbox(self.current - 1);
    self.current--;
  }

  return false;
}

// Switch to next image, 
// if it's the last then back to the first
function routeNext(self){
  if(self.current === (self.length - 1) ){
    self.switchImageLightbox(0);
    self.current = 0;
  } else {
    self.switchImageLightbox(self.current + 1);
    self.current++;
  }
  return false;
}

// Adds active class to the nav items
function setNavItemActive(i){
          
  navItems = popupUI.nav.find('.popup-nav-item');
  navItems.removeClass('active');
  navItems.eq(i).addClass('active');
  
}

// Get the index of the current image being displayed
// !! You cannot have multiple instances of the same image in the collection
function getCurrentIndex(instance){
  var $target   = instance.filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]'  ),
      index     = instance.index($target); 

  return index;  
}

// Binds listeners to the nav, so that they are clickable
function setNav(instance){
  var self = instance;
          
  setNavItemActive(self.current);
  
  popupUI.nav.on('click', '.popup-nav-item', function(){
    
    var $this = $(this);
    
    if($this.hasClass('active')){
      return false;
    }

    popupUI.nav.find('.popup-nav-item').removeClass('active');
    
    var index = $this.index();
    
    if(self.current != index){
      self.switchImageLightbox(index);
      self.current = index;  
      self.setNavItemActive(self.current);
    }
    
    return false;

  });

}

// Adds all the UI Elements and neccessary listeners
function addUI(instance){

  for(var k in popupUI){
    popupUI[k].appendTo('body');  
  }

   var self = instance;
          
  popupUI.prev.on('click',function(e){ routePrev(self); });
  popupUI.next.on('click',function(e){ routeNext(self); });
  
  self.on('click',function(){
    self.current = self.index(this);
  });

  self.each(function(){
    $('<span class="popup-nav-item"><span>').appendTo(popupUI.nav);
  }); 


  popupUI.close.click(function(e){
    quitPopup(e,self);
  });
  
  popupUI.overlay.click(function(e){
    quitPopup(e,self);
  });

  setNav(instance);

}

// Remove all UI Elements and children
function removeUI(){
  
  popupUI.nav.children().remove();
  
  for(var k in popupUI){
    popupUI[k].remove();  
  } 
}

var popupGalery = $('a').imageLightbox({
  onStart : function(){ 
    addUI(popupGalery);
  },
  onEnd   : function(){ 
    removeUI();
  },
  onLoadStart:  false,
  onLoadEnd:    function(){
    setNavItemActive(getCurrentIndex(popupGalery)); // Update the nav when the image changes
  }
});
