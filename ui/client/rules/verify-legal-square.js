import baseMoves from './base-moves.js';
import validatePath from './validate-path.js'; 
import { lookupSquare } from './utilities';

export default (piece, origin, destin, position) => {
  let isLegal = false;
  piece = piece.toUpperCase();
  if (baseMoves[piece](origin, destin)) {
    if (piece === 'N') {
      isLegal = true;    
    } else {
      if(validatePath(origin, destin, position)) {
        if(piece !== 'P' && piece !== 'K') {
          isLegal = true;          
        } else {
          if (piece === 'P') {
            if (origin.col === destin.col) { 
              if (lookupSquare(destin, position) === null) {
                isLegal = true;
              }
            } else {
              if (lookupSquare(destin, position) !== null) { 
                // || move history shows adjacent pawn advancing twice
                // destin col === moves[i].destin.col && Math.abs(moves[i].destin.row - moves[i].destin.col === 2)
                isLegal = true;
              }
            }
                         
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
          if (piece === 'K') {
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