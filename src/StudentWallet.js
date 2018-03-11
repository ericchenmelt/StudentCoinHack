// @flow
import React, { Component } from 'react'
import { Header, Image, Modal, Container, Input, Button, Checkbox, Statistic, Form, Progress, Segment } from 'semantic-ui-react'
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
    fundraisingStatus: null,
    newGoal: 0,
    modalOpen: false,
    status: 'newUser',
    withdrawAmount: 0
  }

  getMinReq = async (idx) => this.props.AccountsInstance.getStudentMinReqIdx(idx)
  getRaised = async (idx) => this.props.AccountsInstance.getStudentRaisedIdx(idx)
  getNumFunders = async (idx) => this.props.AccountsInstance.getNumStudentFundersIdx(idx)
  getFundraisingStatus = async (idx) => this.props.AccountsInstance.getStudentFundraisingIdx(idx)

  async componentWillReceiveProps(nextProps) {
    if (nextProps.AccountsInstance) {
      const result = await nextProps.AccountsInstance.getStudentIdxByAddress();
      const idx = result.c[0]
      console.log('idx', idx)
      const [ minReq, raised, numFunders, fundraisingStatus ] = await Promise.all([ this.getMinReq(idx), this.getRaised(idx), this.getNumFunders(idx), this.getFundraisingStatus(idx) ]);
      this.setState({ minReq: (minReq.c[0]/10000), raised: (raised.c[0] / 10000), numFunders: numFunders.c[0], fundraisingStatus })
      console.log({ minReq: (minReq.c[0]/10000), raised: (raised.c[0] / 10000), numFunders: numFunders.c[0], fundraisingStatus })

      let status;
      if(minReq == 0 && raised == 0 && fundraisingStatus == false) {
        status = "newUser"
      } else {
        if(raised >= minReq) {
          status = "complete"
          console.log("complere!!!!")
        } else {
          status = "inProgress"
        }  
      }
      console.log(status)
      this.setState({status})
    }
  }

  async componentWillMount() {
    if(this.state.fundraisingStatus === null) {
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

  withdraw = async () => {
    const { AccountsInstance, accounts, history, web3 } = this.props;
    
    try {
      const amountWei = web3.toWei(this.state.withdrawAmount, 'ether')
      const result = await AccountsInstance.withdraw(amountWei, {from: accounts[0], gas: 6385876 });  
      console.log(result)
      // this.setState({modalOpen: false})
      this.componentWillReceiveProps(this.props)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const percent = (this.state.raised + 0.000000001)/(this.state.minReq + 0.000000001)*100

    return (
    	<StyledWallet>
        <Container text>
          <Header as='h1'>My Wallet</Header>
          <p>{this.state.status == "inProgress" ? "Funding is in progress" : ""}{this.state.status == "Funding is complete" ? "complete" : ""}
          {this.state.status == "newUser" ? "Welcome new user, click the button to start raising funds" : ""}</p>
          { this.state.status != "newUser" ? <div>
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
          </div> : "" }
          { this.state.status != "inProgress" ? <Modal trigger={
            <Button color='green'>Start Fundraising</Button>
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
          </Modal> : ""}

          { this.state.status == "complete" ? 
            <div style={{marginTop: 40}}>
              <Header as='h2'>Withdraw</Header>
              <Form onSubmit={this.withdraw}>
                 <Form.Field inline>
                   <label>Amount</label>
                   <Input placeholder='100' type='number' onChange={(e) => this.setState({withdrawAmount: e.target.value})} />
                 </Form.Field>
                 <Form.Field inline>
                   <label>What for?</label>
                   <Input placeholder='Food' />
                 </Form.Field>
                 <Button color='green'>Submit</Button>
               </Form>
              </div>
          : ""}
        </Container>
      </StyledWallet>
    )
  }
}

export default StudentWallet;