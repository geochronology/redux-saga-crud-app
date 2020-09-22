import React from 'react';

function* testing() {
  // it's possible to run the code in a looping pattern
  // by wrapping it in a while(true) loop
  while (true) {
    yield 1;
    // if there is code here it will run up to next yield
    yield 2;
    yield 3;
  }
}

function App() {
  // obtain the iterator by calling testing directly
  const iterator = testing()
  // next(): run the code until the NEXT yield statement
  console.log(iterator.next())
  // this will return 'done: false' because the iterator hasn't finished yet
  console.log(iterator.next())
  console.log(iterator.next())
  // the fourth iterator will return 'done: true' because all the yields be done;
  // within a while(true) loop it will go back to yield 1
  console.log(iterator.next())

  return (
    <div>
      Test
    </div>
  );
}

export default App;
