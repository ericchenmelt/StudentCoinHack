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

  async componentWillReceiveProps(nextProps) {
    if (nextProps.AccountsInstance) {
      const idx = await nextProps.AccountsInstance.getStudentIdxByAddress();
      const [ name, uni, country, acc ] = await Promise.all([ this.getName(idx), this.getUni(idx), this.getCountry(idx), this.getAcc(idx) ]);
      this.setState({ name, uni, country })
    }
  }

  async componentWillMount() {
    if(this.state.name === null) {
      this.componentWillReceiveProps(this.props)
    }
  }

  render() {
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