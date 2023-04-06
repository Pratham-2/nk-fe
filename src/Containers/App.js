
import './App.css';
import Admin from './Admin';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App page d-flex flex-row flex-column-fluid">
      <Admin />
    </div>
  );
}

export default withRouter(App);
