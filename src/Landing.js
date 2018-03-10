// @flow
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <p>student coin app</p>

          <Button as={Link} to='/funder/signup'>Fund a student</Button>
          <Button as={Link} to='/student/signup'>Get a student loan</Button>
        </div>
      </div>
    );
  }
}

export default Landing;