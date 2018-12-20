import React from 'react'
import { BrowserRouter, Route,Switch } from 'react-router-dom';


//同步加载
import AppContainer from '../container/AppContainer/AppContainer'
// import NotFoundPage from '../container/NotFoundPage'


const RootRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route  path="/" component={AppContainer} />
      {/* <Route component={NotFoundPage}/> */}
    </Switch>
  </BrowserRouter>
);
export default RootRouter;