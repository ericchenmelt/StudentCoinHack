// @flow
import React, { Component } from 'react'
import { Button, Container, Header, Checkbox, Form } from 'semantic-ui-react'
import styled from 'styled-components';


const StyledFunderForm = styled.div`
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
  }

`;


const FunderForm = () => <StyledFunderForm>

  <Container text>
    <Header as='h1'>Create a Funder Account</Header>

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
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>

      <Button color='purple' size='huge' type='submit'>Submit</Button>
    </Form>

  </Container>

</StyledFunderForm>

export default FunderForm