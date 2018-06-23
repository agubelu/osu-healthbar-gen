function shake(elem) {
    var l = 12;  
    for( var i = 0; i < 10; i++ ) {
      $(elem).animate({ 
            'margin-left': "+=" + ( l = -l ) + 'px',
            'margin-right': "-=" + l + 'px'
        }, 50); 
    }
}

export default shake;