// @flow
import React, { Component } from 'react'
import { Container, Button, Header, Checkbox, Form } from 'semantic-ui-react'
import styled from 'styled-components';

const StyledWallet = styled.div`

  background: rgb(237, 248, 252);
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  width:calc(100% - 150px);;


  div.ui.text.container {
    padding-top: 2%;
  }


  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 2rem;
      font-weight:400;
    
    }
  }

`;

class StudentWallet extends Component {
  render() {
    return (
    	 <StyledWallet>
     	  <Container>
	        <Header as='h1'>My Wallet</Header>

	    
	      </Container>
	      </StyledWallet>
      
     
    )
  }
}

export default StudentWallet;