import { definitions } from './data/data_for_definition_component.js';
import Definitions from "./components/Definitions.jsx";


function App() {
  return (
      <div>
        <Definitions data={definitions} />
      </div>
  );
}

export default App
