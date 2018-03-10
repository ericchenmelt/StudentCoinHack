// @flow
import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
// import { Button } from 'semantic-ui-react'

class App extends Component {
  state = {
    storageValue: 0,
    web3: null
  }

  async componentWillMount() {
    try {
      const results = await getWeb3;
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract() 
    } catch (e) {
      console.log('Error finding web3.')
    }
  }

  async instantiateContract() {
    // configure and include the smart contract
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)
    // Declaring this for later so we can chain functions on SimpleStorage.
    let simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts(async (error, accounts) => {
      const instance = await simpleStorage.deployed();
      simpleStorageInstance = instance
      // Stores a given value, 5 by default.
      // let result = await simpleStorageInstance.set(5, {from: accounts[0]})
      // Get the value from the contract to prove it worked.
      const result = await simpleStorageInstance.get()
      // Update state with the result.
      this.setState({ storageValue: result.c[0] })
    })  
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
