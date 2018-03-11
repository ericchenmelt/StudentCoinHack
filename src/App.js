// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AccountsContract from '../build/contracts/Accounts.json'
import getWeb3 from './utils/getWeb3'

import Landing from './Landing'
import StudentSignup from './StudentSignup'
import FunderSignup from './FunderSignup'
import SideBar from './SideBar'
import StudentWallet from './StudentWallet'
import StudentProfile from './StudentProfile'
import StudentTransactions from './StudentTransactions'


// import Test from './Test'

class App extends Component {
  state = {
    web3: null,
    AccountsInstance: null,
    accounts: null
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      this.setState({ web3: results.web3 })

      // configure and include the smart contract
      const contract = require('truffle-contract')
      const Accounts = contract(AccountsContract)
      
      Accounts.setProvider(this.state.web3.currentProvider)
    
      // Get accounts.
      this.state.web3.eth.getAccounts(async (error, accounts) => {
        const instance = await Accounts.deployed();
        this.setState({ accounts: accounts, AccountsInstance: instance });
      })
    } catch (e) {
      console.log('Error finding web3.')
    }
  }

  render() {
    const { web3 } = this.state;
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => ( <Landing {...props} {...this.state} /> )} />
          <Route exact path="/student/signup" render={(props) => ( <StudentSignup {...props} {...this.state} /> )} />
          <Route exact path="/student/wallet" render={(props) => ( <SideBar><StudentWallet {...props} {...this.state} /></SideBar> )} />
          <Route exact path="/student/profile" render={(props) => ( <SideBar><StudentProfile {...props} {...this.state} /></SideBar> )} />
          {/*<Route exact path="/student/myfunders" component={StudentMyFunders} />*/}
          <Route exact path="/student/transactions" render={(props) => ( <SideBar><StudentTransactions {...props} {...this.state} /></SideBar> )} />

          <Route exact path="/funder/signup" render={(props) => ( <FunderSignup {...props} {...this.state} /> )} />
          {/*<Route exact path="/funder/home" component={FunderHome} />*/}
          {/*<Route exact path="/test" component={Test} />*/}
        </div>
      </Router>
    )
  }
}

export default App;
