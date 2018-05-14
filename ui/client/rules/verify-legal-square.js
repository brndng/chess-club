import baseMoves from './base-moves.js';
import validatePath from './validate-path.js'; 

module.exports = (selectedPiece, origin, destination, position) => {
  let isLegal = false;
  selectedPiece = selectedPiece.toUpperCase();
  if (baseMoves[selectedPiece](origin, destination)) {
    if (selectedPiece === 'N') {
      isLegal = true;    
    } else {
      if(validatePath(origin, destination, position)) {
        if(selectedPiece !== 'P' && selectedPiece !== 'K') {
          isLegal = true;          
        } else {
          if (selectedPiece === 'P') {
            isLegal = true;              
            //if forward
              //sq piece === null?
                //if last rank
                  //place and promote
                //else
                  //place
            //if diagonal
              //sq piece === null?
                //en passant conditions?
                  //place
            //else
              //place
          }
          if (selectedPiece === 'K') {
            isLegal = true;              
            //if inCheck
              //if 1 sq
                //place
            //else
              //if 1 sq
                //place
              //if 2 sq
                //castle
          }
        }
      } 
    }      
  }
  return isLegal;
}