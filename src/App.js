import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SpecialistDashboard from './pages/SpecialistDash';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" > <div className="App">
          <Login/>
    </div></Route>
    <Route path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/specialist" component={SpecialistDashboard} />
  
      </Switch>
    </Router>
   
  );
}

export default App;
