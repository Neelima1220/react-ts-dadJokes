import * as React from 'react';
import './style.css';

export default function App() {
  const [jokeList, setJokeList] = React.useState(
    JSON.parse(localStorage.getItem('jokeList')) || []
  );
  const [likesCount, setLikesCount] = React.useState(0);
  const getJokesData = async () => {
    const jokesData = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    const getJok = await jokesData.json();
    const tempJokeList = [...jokeList, getJok.joke];
    setJokeList(tempJokeList);
    localStorage.setItem('jokeList', JSON.stringify(tempJokeList));
  };
  React.useEffect(() => {
    getJokesData();
  }, []);
  return (
    <div>
      <button onClick={getJokesData}>getJoke</button>
      {jokeList &&
        jokeList.map((joke, index) => {
          return (
            <div key={index}>
              <p>{joke}</p>
              <p>Likes:{likesCount}</p>
              <button>🖕</button>
              <button>👇</button>
            </div>
          );
        })}
    </div>
  );
}
