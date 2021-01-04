const fetch = require('node-fetch');

const getScores = async () => {
  try {
    const scores = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/EAmMb5n2DwZx5FckBpwu/scores', {
      mode: 'cors',
      method: 'get',
    });
    return scores.json();
  } catch (err) {
    return err;
  }
};


export const postScore = async (user, score) => {
  const post = JSON.stringify({ user, score });
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/EAmMb5n2DwZx5FckBpwu/scores/';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const answer = await response.json();
  return answer;
};

export const handleScores = async () => {
  const scores = await getScores();
  console.log(scores);
};
