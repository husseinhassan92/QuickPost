import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcom from './Pages/WelcomePage/Welcom';
import { BrowserRouter as Router, Route, Switch , Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './Pages/Login/Login';
import Sginup from './Pages/SginUp/SginUp';



function App() {
  return (
    <>


    <Router>
      <Switch>
      <Route exact path='/' component={Welcom} />
      <Route path='/Login' component={Login} />
      <Route path='/Sginup'  component={Sginup}/>

      </Switch>
    </Router>

   
    
   

  
    </>
    );
}

export default App;
