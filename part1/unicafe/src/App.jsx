import { useState } from 'react';

const Header = ({title}) => <h1>{title}</h1>
const Button = ({name, handler}) => <button onClick={handler}>{name}</button>
const Tag = ({name, value}) => <p>{name} {value}</p>
const Options = ({items}) => {
  const button1 = items[0];
  const button2 = items[1];
  const button3 = items[2];

  return (
    <div>
      <Button name={button1.name} handler={button1.handler} />
      <Button name={button2.name} handler={button2.handler} />
      <Button name={button3.name} handler={button3.handler} />
    </div>
  );
}
const Board = ({items}) => {
  const item1 = items[0];
  const item2 = items[1];
  const item3 = items[2];
  let positive = "0 %";

  const total = item1.value + item2.value + item3.value;
  const average = Number(total / 3).toFixed(5);

  if (total !== 0)
    positive = Number((item1.value / total) * 100).toFixed(2) + " %";

  return (
    <div>
      <Tag name={item1.name} value={item1.value}/>
      <Tag name={item2.name} value={item2.value}/>
      <Tag name={item3.name} value={item3.value}/>
      <Tag name="all" value={total}/>
      <Tag name="average" value={average}/>
      <Tag name="positive" value={positive} />
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  const items = [
    {
      name: 'good',
      handler: increaseGood,
      value: good,
    },
    {
      name: 'neutral',
      handler: increaseNeutral,
      value: neutral,
    },
    {
      name: 'bad',
      handler: increaseBad,
      value: bad,
    }
  ];

  return (
    <div>
      <Header title="give feedback" />
      <Options items={items} />
      <Header title="statistics" />
      <Board items={items} />
    </div>
  )
}

export default App
