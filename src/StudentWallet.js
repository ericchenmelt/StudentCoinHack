// @flow
import React, { Component } from 'react'
import { Header, Image, Modal, Container, Button, Checkbox, Statistic, Form, Progress, Segment } from 'semantic-ui-react'
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

    p.ui{
    	font-size:2rem;
    	font-weight:300;
    	color:green;
    }
  }
`;

class StudentWallet extends Component {

  state = {
    minReq: 0,
    raised: 0,
    numFunders: 0,
    fundraisingStatus: false,
    newGoal: 0,
    modalOpen: false
  }

  getMinReq = async (idx) => this.props.AccountsInstance.getStudentMinReqIdx(idx)
  getRaised = async (idx) => this.props.AccountsInstance.getStudentRaisedIdx(idx)
  getNumFunders = async (idx) => this.props.AccountsInstance.getNumStudentFundersIdx(idx)
  getFundraisingStatus = async (idx) => this.props.AccountsInstance.getStudentFundraisingIdx(idx)

  async componentWillReceiveProps(nextProps) {
    if (nextProps.AccountsInstance) {
      const idx = await nextProps.AccountsInstance.getStudentIdxByAddress();
      const [ minReq, raised, numFunders, fundraisingStatus ] = await Promise.all([ this.getMinReq(idx), this.getRaised(idx), this.getNumFunders(idx), this.getFundraisingStatus(idx) ]);
      this.setState({ minReq: (minReq.c[0]/10000), raised: (raised.c[0] / 10000), numFunders: numFunders.c[0], fundraisingStatus })
      console.log(raised)
    }
  }

  async componentWillMount() {
    if(this.state.name === null) {
      this.componentWillReceiveProps(this.props)
    }
  }

  handleSubmit = async () => {
    const { AccountsInstance, accounts, history, web3 } = this.props;
  
    try {
      const amountWei = web3.toWei(this.state.newGoal, 'ether')
      const result = await AccountsInstance.startFundraising(amountWei, {from: accounts[0], gas: 6385876 });  
      console.log(result)
      this.setState({modalOpen: false})
      this.componentWillReceiveProps(this.props)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const percent = (this.state.raised + 1)/(this.state.minReq + 1)*100

    return (
    	<StyledWallet>

	      
      <Container text>

	        <Header as='h1'>My Wallet</Header>

            
	        <p>funding is complete!</p>
            <p>Funding in Progress!</p> 
    
             <div>
               <Progress percent={percent} />
             </div>

	        <div>

	      		<Segment.Group horizontal>
	               <Segment textAlign='center'>
				       <Statistic>
					    <Statistic.Value>{this.state.minReq} ETH</Statistic.Value>
					    <Statistic.Label>Your Goal</Statistic.Label>
					   </Statistic>
					</Segment>


	         <Segment textAlign='center'>
					   <Statistic>
					    <Statistic.Value>{this.state.raised} ETH</Statistic.Value>
					    <Statistic.Label>Raised</Statistic.Label>
					   </Statistic>
					</Segment>
          <Segment textAlign='center'>
             <Statistic>
              <Statistic.Value>{this.state.numFunders}</Statistic.Value>
              <Statistic.Label>Funders</Statistic.Label>
             </Statistic>
          </Segment>
				  
			  	</Segment.Group> 
			</div> 
		   
	    
	     
        
          <Modal trigger={
            <Button>Start Fundraising</Button>
          }>
            <Modal.Header>New Fundraising</Modal.Header>
            <Modal.Content>
              <Modal.Description>

                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Goal amount</label>
                    <input placeholder='1000 ETH' onChange={(e) => this.setState({newGoal: e.target.value})} />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

              </Modal.Description>
            </Modal.Content>
          </Modal>
        

      </Container>
      </StyledWallet>
    )
  }
}

export default StudentWallet;