import './App.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage/SettingsPage.component';
import HomePage from './pages/HomePage/HomePage.component';

function App() {
  return (
    <Router className='App'>
      <Switch>
        <Route path='/pattern-settings' component={SettingsPage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
