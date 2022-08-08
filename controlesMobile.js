function controlesMobile(funcComandos){
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    var xDown = null;
    var yDown = null;
    
    let firstTouch;

    function getTouches(evt) {
      return evt.touches || evt.originalEvent.touches;
    }
    
    function handleTouchStart(evt) {
      firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;

      funcComandos.onTouchDown && funcComandos.onTouchDown(firstTouch)
    }
    
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }
    
      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
    
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
    
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
            xDown = xUp + 10
            funcComandos.onSwipeLeft && funcComandos.onSwipeLeft(firstTouch);
        } else {
            xDown = xUp - 10
            funcComandos.onSwipeRight && funcComandos.onSwipeRight(firstTouch);
        }
      } else {
        if (yDiff > 0) {
            yDown = yUp + 10
            funcComandos.onSwipeUp && funcComandos.onSwipeUp(firstTouch);
        } else {
            yDown = yUp - 10
            funcComandos.onSwipeDown && funcComandos.onSwipeDown(firstTouch);
        }
      }
      /* reset values */
      //xDown = null;
      //yDown = null;
    }

    function handleTouchEnd (evt){
        funcComandos.onTouchUp && funcComandos.onTouchUp(firstTouch);
    }
}

export default controlesMobile;