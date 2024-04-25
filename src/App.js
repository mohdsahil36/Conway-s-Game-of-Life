import './App.css';
import GameOfLife from './components/Dashboard/GameofLife';

function App() {

  return (
    <div className="App">
      <h1 className='page-title'>Conway's game of life</h1>
      <GameOfLife/>
    </div>
  );
}

export default App;