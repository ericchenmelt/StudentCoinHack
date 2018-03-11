// @flow
import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class StudentForm extends Component {
  state = {
    name: null,
    country: null,
    uni: null
  }

  handleSubmit = async () => {
    const { AccountsInstance, accounts, history } = this.props;
  
    try {
      const result = await AccountsInstance.addStudent(this.state.name, this.state.uni, this.state.country, {from: accounts[0] });  
      history.push('/student/wallet')
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    console.log(this.props)
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Full Name</label>
          <input placeholder='Full Name' onChange={(e) => this.setState({name: e.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Country</label>
          <input placeholder='Country' onChange={(e) => this.setState({country: e.target.value})}/>
        </Form.Field>

        <Form.Field>
          <label>University</label>
          <input placeholder='University' onChange={(e) => this.setState({uni: e.target.value})}/>
         </Form.Field>

        <Button type='submit'>Sign up</Button>
      </Form>
    )
  }
}

export default StudentForm