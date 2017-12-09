var button = document.getElementById('submit_btn') ;
button.onclick = function() {
      
    // create a request object
    var request = new XMLHttpRequest() ;
   
    // Capture the response and store it in a variable
    request.onreadystatechange = function() {

    if(request.readyState === XMLHttpRequest.DONE) {
        if(request.status === 200)
          {
              
      console.log('Value is send successsfully') ;
 
  
          }
              
          else if(request.status === 500){
              alert("Something went wrong on the server") ;
          }
    }
  
    
        
    };
    var inputvalue = document.getElementById('inputvalue').value;
     console.log(inputvalue);
    
    
    request.open('POST', '/inputvalue', true) ;
    request.setRequestHeader('Content-Type','application/json') ;
    request.send(JSON.stringify({Inputvalue: inputvalue})) ;

    
};
