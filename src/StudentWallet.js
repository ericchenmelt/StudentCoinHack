// @flow
import React, { Component } from 'react'
import { Header, Image, Modal, Container, Button, Checkbox, Form } from 'semantic-ui-react'

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
      this.setState({modalOpen: false})
      this.componentWillReceiveProps(this.props)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        {!this.state.fundraisingStatus && this.state.raised && <p>funding is complete!</p> }
        {this.state.fundraisingStatus && <p>funding in progress!</p> }
        <p>minReq: {this.state.minReq}</p>
        <p>raised: {this.state.raised}</p>
        {!this.state.fundraisingStatus &&
          <Modal open={this.state.modalOpen} trigger={
            <Button onClick={() => this.setState({modalOpen: true})}>Start Fundraising</Button>
          }>
            <Modal.Header>New Fundraising</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Goal amount (ETH)</label>
                    <input placeholder='1000' type='number' onChange={(e) => this.setState({newGoal: e.target.value})} />
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
    )
  }
}

export default StudentWallet;