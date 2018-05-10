import baseMoves from './base-moves.js';
import validatePath from './validate-path.js'; 

module.exports = (selectedPiece, origin, destination, matrix) => {
  const [ rowStart, colStart ] = origin;
  const [ row, col ] = destination;
  let legal = false;
  selectedPiece = selectedPiece.toUpperCase();
  if (baseMoves[selectedPiece](rowStart, colStart, row, col)) {
    if (selectedPiece === 'N') {
      legal = true;      
    } else {
      if(validatePath(origin, [row, col], matrix)) {
        if(selectedPiece !== 'P' && selectedPiece !== 'K') {
          legal = true;          
        } else {
          if (selectedPiece === 'P') {
            legal = true;              
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
            legal = true;              
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
  return legal;
}