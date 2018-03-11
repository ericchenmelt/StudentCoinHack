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
    fundraisingStatus: false,
    newGoal: 0,
    modalOpen: false
  }

  getMinReq = async (idx) => this.props.AccountsInstance.getStudentMinReqIdx(idx)
  getRaised = async (idx) => this.props.AccountsInstance.getStudentRaisedIdx(idx)
  getFundraisingStatus = async (idx) => this.props.AccountsInstance.getStudentFundraisingIdx(idx)

  async componentWillReceiveProps(nextProps) {
    if (nextProps.AccountsInstance) {
      const idx = await nextProps.AccountsInstance.getStudentIdxByAddress();
      const [ minReq, raised, fundraisingStatus ] = await Promise.all([ this.getMinReq(idx), this.getRaised(idx), this.getFundraisingStatus(idx) ]);
      this.setState({ minReq: minReq.c[0], raised: raised.c[0], fundraisingStatus })
    }
  }

  async componentWillMount() {
    if(this.state.name === null) {
      this.componentWillReceiveProps(this.props)
    }
  }

  handleSubmit = async () => {
    const { AccountsInstance, accounts, history } = this.props;
  
    try {
      const result = await AccountsInstance.startFundraising(this.state.newGoal, {from: accounts[0], gas: 6385876 });  
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
	        {/*<p>raised: {this.state.raised}</p>
	        <p>minReq: {this.state.minReq}</p>*/}
            
            
	        {!this.state.fundraisingStatus && this.state.raised && <p>funding is complete!</p> }
            {this.state.fundraisingStatus && <p>Funding in Progress!</p> }
    
             <div>
               <Progress percent={percent} />
             </div>

	        {this.state.minReq && <div>

	      		<Segment.Group horizontal>
	               <Segment textAlign='center'>
				       <Statistic>
					    <Statistic.Value>{this.state.minReq}</Statistic.Value>
					    <Statistic.Label>Your Goal</Statistic.Label>
					   </Statistic>
					</Segment>


	                <Segment textAlign='center'>
					   <Statistic>
					    <Statistic.Value>{this.state.raised}</Statistic.Value>
					    <Statistic.Label>Raised</Statistic.Label>
					   </Statistic>
					</Segment>
				  
			  	</Segment.Group> 
			</div> 
		   }
	    
	     
        {!this.state.fundraisingStatus &&
          <Modal trigger={
            <Button>Start Fundraising</Button>
          }>
            <Modal.Header>New Fundraising</Modal.Header>
            <Modal.Content>
              <Modal.Description>

                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Goal amount</label>
                    <input placeholder='1000 ETH' />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

              </Modal.Description>
            </Modal.Content>
          </Modal>
        }

      </Container>
      </StyledWallet>
    )
  }
}

export default StudentWallet;