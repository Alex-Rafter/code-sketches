
import { useStore } from './State';
import './Button.css';

function Button() {
  const customEvent = new CustomEvent('build', { detail: { name: 'thingy' } });
  const custom = () => document.dispatchEvent(customEvent);
  const increasePopulation = useStore((state) => state.increasePopulation)
  const selectRandomBear = useStore((state) => state.selectRandomBear)

  return (
    <div>
        <button onClick={increasePopulation}>Click Me</button>
        <button onClick={() => {selectRandomBear(); console.log('second')}}>Get Random</button>
    </div>        
  );
}

export default Button;
