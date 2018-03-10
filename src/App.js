// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from './Landing'
import StudentSignup from './StudentSignup'
import FunderSignup from './FunderSignup'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/student/signup" component={StudentSignup} />
      {/*<Route exact path="/student/profile" component={StudentProfile} />
      <Route exact path="/student/wallet" component={StudentWallet} />
      <Route exact path="/student/myfunders" component={StudentMyFunders} />
      <Route exact path="/student/transactions" component={StudentTransactions} />*/}

      <Route exact path="/funder/signup" component={FunderSignup} />
      {/*<Route exact path="/funder/home" component={FunderHome} />*/}
    </div>
  </Router>
);

export default App;
