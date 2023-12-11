import { useState } from "react"

const Board = ({title, message, votes}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <p>has {votes} votes</p>
    </div>
  );
}
const Button = ({handler, title}) => <button onClick={handler}>{title}</button> 
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));

  const changeSelected = () => {
    const random = Math.floor(Math.random() * (7 - 0 + 1) + 0);
    setSelected(random);
  };
  const voteByAnecdote = () => {
    const newVotes = [...votes];

    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  let max = { value: votes[0], index: 0};
  votes.forEach((value, index) => {
    if (value > max.value) {
      max.value = value;
      max.index = index;
    }
  });

  return (
    <div>
      <Board title="Anecdote of the day" message={anecdotes[selected]} votes={votes[selected]} />
      <Button handler={voteByAnecdote} title="vote"/>
      <Button handler={changeSelected} title="next anecdote"/>
      <Board title="Anecdote with most votes" message={anecdotes[max.index]} votes={votes[max.index]} />
    </div>
  )
}

export default App
