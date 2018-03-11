// @flow
import React, { Component } from 'react'
import { Header, Container, Button, Checkbox, Form } from 'semantic-ui-react'

class StudentProfile extends Component {
  state = {
    name: null, 
    country: null, 
    uni: null 
  }

  getName = async (idx) => this.props.AccountsInstance.getStudentNameIdx(idx)
  getUni = async (idx) => this.props.AccountsInstance.getStudentUniIdx(idx)
  getCountry = async (idx) => this.props.AccountsInstance.getStudentCountryIdx(idx)
  getAcc = async (idx) => this.props.AccountsInstance.getStudentAccIdx(idx)

  willLoadContent = async () => {
    if(this.props.web3 && this.props.AccountsInstance) {
      const [ name, uni, country, acc ] = await Promise.all([ this.getName(0), this.getUni(0), this.getCountry(0), this.getAcc(0) ]);
      this.setState({ name, uni, country })
    }
  }

  render() {
    this.willLoadContent()
    const { name, uni, country } = this.state;
    return (
      <Container>
        <Header as='h1'>Profile</Header>
        <Header as='h3'>Name: {name}</Header>
        <p>University: {uni}</p>
        <p>Country: {country}</p>
      </Container>
    )
  }
}

export default StudentProfile;