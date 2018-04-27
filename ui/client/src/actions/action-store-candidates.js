const storeCandidates = (list) => {
  console.log('candidate squares:', list)
  return {
    type: 'CANDIDATES_DETERMINED',
    payload: list,
  };
}

export default storeCandidates;