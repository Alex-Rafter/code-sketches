import logo from './logo.svg';
import './App.css';
import Button from './Button'
import { useStore } from './State';

function App() {
  document.addEventListener('build', ({ detail }) => {console.log(detail.name);})

  const logger = () => console.log('i work too');
  const bears = useStore((state) => state.bears)
  const selectedBear = useStore(state => state.selectedBear)

  return (
    <div className="App">
      <header className="App-header" onDoubleClick={logger}>
          <h1>{bears} around here ...</h1>
          <h2>{!selectedBear ? 'Select a Random Bear' : selectedBear}</h2>
          <Button/>
      </header>
    </div>
  );
}

export default App;
