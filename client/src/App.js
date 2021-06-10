import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import Home from './Pages/Home';
import UploadImage from './Pages/UploadImage';
import List from './Pages/List'
const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/admin/upload" exact component={UploadImage} />
      <Route path="/admin/list" exact component={List} />
    </Switch>
  </Router>
);


export default App;
