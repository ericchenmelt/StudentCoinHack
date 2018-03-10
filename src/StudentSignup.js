// @flow
import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'



const StudentForm = () => (
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
    <Button type='submit'>Submit</Button>
  </Form>
)

export default StudentForm