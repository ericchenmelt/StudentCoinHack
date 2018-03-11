import React, { Component } from 'react'
import { Header,Container,Table } from 'semantic-ui-react'
import styled from 'styled-components';

const StyledTransactions = styled.div`
  background: rgb(237, 248, 252);
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  width:calc(100% - 150px);


  div.ui.text.container {
    padding-top: 2%;
  }


  @media only screen and (min-width: 768px) {
    h1.ui.header {
      font-size: 2rem;
      font-weight:400;
      margin-top:0;
    }
  }

`;


class StudentTransactions extends Component {
  state = {
    time: null,
    from: null,
    to: null,
    amount: null
  }

  // handleSubmit = async () => {
  //   const { AccountsInstance, accounts, history } = this.props;
  
  //   try {
  //     const result = await AccountsInstance.addStudent(this.state.name, this.state.uni, this.state.country, {from: accounts[0] });  
  //     history.push('/student/wallet')
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  render() {
    return(
    <StyledTransactions>
      <Container text>
        <Header as='h1'>Transaction History</Header>

        <Table>
	        <Table.Header>
		        <Table.Row>
		        <Table.HeaderCell>Time</Table.HeaderCell>
		        <Table.HeaderCell>From</Table.HeaderCell>
		        <Table.HeaderCell>To</Table.HeaderCell>
		        <Table.HeaderCell>Amount</Table.HeaderCell>
		      </Table.Row>
            </Table.Header>

            <Table.Body>
 			    <Table.Row>
		        <Table.HeaderCell>03/11/2018</Table.HeaderCell>
		        <Table.HeaderCell>Japan</Table.HeaderCell>
		        <Table.HeaderCell>Canada</Table.HeaderCell>
		        <Table.HeaderCell>300</Table.HeaderCell>
		        </Table.Row>
            </Table.Body>

            

        </Table>
      </Container>

    </StyledTransactions>

    )
  }
}

export default StudentTransactions