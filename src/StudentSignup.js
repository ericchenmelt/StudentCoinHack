// @flow
import React, { Component } from 'react'
import { Button, Checkbox, Header,Container, Form } from 'semantic-ui-react'
import styled from 'styled-components';


const StudentForm = styled.div`
  background: rgb(237, 248, 252);
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  width: 100%;

  div.ui.text.container {
    padding-top: 10%;
  }


  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 4rem;
    }

    .ui.green.huge.button {
      margin-left: 40px;
    }
  }

`;


const StyledForm = () => <StudentForm>


    <Container text>
         <Header as='h1'>Create a Student Account</Header>

         <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>

          <Form.Field>
            <label>Country</label>
            <input placeholder='Country'/>
          </Form.Field>

          <Form.Field>
            <label>University</label>
            <input placeholder='University'/>
           </Form.Field>

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button color='green' size='huge' type='submit'>Submit</Button>
        </Form>
    </Container>

</StudentForm>


class StudentForm extends Component {
  render() {
    return (
      <div>
        <StyledForm />
      </div>
    );
  }
}

export default StudentForm