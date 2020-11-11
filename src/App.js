import React from 'react';
import './App.css';
import Navbar from "./Components/NavBar/NavBar"
import Home from './Components/pages/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './Components/pages/Register';
import Tutor from './Components/pages/Tutor';
import Student from './Components/pages/Student';
import Subject from './Components/pages/Subject';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
       <Route path='/' exact component={Home}/> 
       <Route path='/register' exact component={Register}/> 
       <Route path='/tutor' component={Tutor} />
        <Route path='/student' component={Student} />
        <Route path='/subjects' exact component={Subject}/>
        <Route path='/FIS'  component={Subject}/>
        <Route path='/QUI'  component={Subject}/>
        <Route path='/MAT'  component={Subject}/>
        <Route path='/CAL1'  component={Subject}/>
        <Route path='/CAL2'  component={Subject}/>
        <Route path='/CAL3'  component={Subject}/>
        <Route path='/ALG1'  component={Subject}/>
        <Route path='/ALG2'  component={Subject}/>
        <Route path='/FIS_GEN'  component={Subject}/>
        <Route path='/FIS1'  component={Subject}/>
        <Route path='/FIS2'  component={Subject}/>
        <Route path='/FIS3'  component={Subject}/>
        <Route path='/QUI1'  component={Subject}/>
        <Route path='/QUI2'  component={Subject}/>
      </Switch>
    </Router>
      
  );
}

export default App;
