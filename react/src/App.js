import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import GardenIndexContainer from "./containers/GardenIndexContainer";

const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={GardenIndexContainer}/>
          <Route path='/static_pages' component={GardenIndexContainer}/>
          <Route path='/gardens' component={GardenIndexContainer}/>
          <Route path='/gardens/new' component={GardenIndexContainer}/>
        </Route>
      </Router>
    </div>
  );
};

export default App;
