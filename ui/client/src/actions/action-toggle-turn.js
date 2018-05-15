const toggleTurn = () => {
  console.log('\tturn toggled!!!')
  return {
    type: 'PLAYER_MOVED',
    payload: null
  };
}

export default toggleTurn;