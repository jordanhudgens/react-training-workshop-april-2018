////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

const players = [
  { name: 'Altuve', position: '2b' },
  { name: 'Correaa', position: 'ss' },
  { name: 'Bregman', position: '3b' }
]

const element = (
  <div>
    {players.map((player, idx) => (
      <div key={idx}>
        {player.name} | {player.position.toUpperCase()}
      </div>
    ))}
  </div>
);

function App() {
  return element;
}

ReactDOM.render(<App />, document.getElementById("app"));
