import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import PlantsIndexContainer from "./containers/PlantsIndexContainer";
import NavBar from "./components/NavBar";


const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NavBar}>
          <IndexRoute component={PlantsIndexContainer}/>
          <Route path='/static_pages' component={PlantsIndexContainer}/>
          <Route path='/plants' component={PlantsIndexContainer}/>
          <Route path='/plants/new' component={PlantsIndexContainer}/>
        </Route>
      </Router>
    </div>
  );
};

export default App;
