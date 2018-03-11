// @flow
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button, Container, Header } from 'semantic-ui-react'
import styled from 'styled-components';
import Grad from './images/grad.svg'

const Section = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

const BannerSection = styled(Section)`
  background: url(${Grad}) no-repeat center center;
  background-size: cover;
  

  div.ui.text.container {
    padding-top: 10%;
  }

  .ui.green.huge.button {
    margin-left: 20px;
  }

  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 4rem;
    }

    h2.ui.header {
      margin-bottom: 30px;
      margin-top: 0;
      font-size: 2rem;
    }

    .ui.green.huge.button {
      margin-left: 40px;
    }
  }

`;

const StyledBannerSection = () => <BannerSection>
  <Container text>
    <Header as='h1'>StudentCoin</Header>
    <Header as='h2'>Revolutionizing the way students get loans</Header>

    <div>
      <Button color='purple' size='huge' as={Link} to='/funder/signup'>Fund a student</Button>
      <Button color='green' size='huge' as={Link} to='/student/signup'>Get a loan</Button>
    </div>
  </Container>
</BannerSection>

class Landing extends Component {
  render() {
    return (
      <div>
        <StyledBannerSection />
      </div>
    );
  }
}

export default Landing;