// @flow
import React, { Component } from 'react'
import { Button, Card, Image, Container, Header } from 'semantic-ui-react'
import styled from 'styled-components';


const StyledFunder = styled.div`
   background: rgb(237, 248, 252);
   background-size: cover;
   height: 100%;
   min-height: 100vh;
   width:100%;

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


const promiseWhile = (data, condition, action) => {  
  var whilst = (data) => {
    return condition(data) ?
      action(data).then(whilst) :
      Promise.resolve(data);
  }
  return whilst(data);
};

class FunderHome extends Component {

  state = {
    name: null,
    students: []
  }

  getName = async (idx, params) => this.props.AccountsInstance.getLenderNameByAddress(idx, params)
  getStudentsCount = async () => this.props.AccountsInstance.getStudentCount()
  getStudentName = async (idx) => this.props.AccountsInstance.getStudentNameIdx(idx)
  getStudentUni = async (idx) => this.props.AccountsInstance.getStudentUniIdx(idx)
  getStudentCountry = async (idx) => this.props.AccountsInstance.getStudentCountryIdx(idx)
  getStudentAcc = async (idx) => this.props.AccountsInstance.getStudentAccIdx(idx)
  
  async componentWillReceiveProps(nextProps) {
    if (nextProps.AccountsInstance) {
      const result = await nextProps.AccountsInstance.getLenderIdxByAddress();
      const idx = result.c[0];
      const [ name ] = await Promise.all([ this.getName(idx, {from: nextProps.accounts[0] }) ]);
      const students = await this.getAllStudents(nextProps);
      this.setState({ name })
    }
  }

  async componentWillMount() {
    if(this.state.name === null) {
      this.componentWillReceiveProps(this.props)
    }
  }

  getAllStudents = async (nextProps) => {
    const result = await nextProps.AccountsInstance.getStudentCount();
    const count = result.c[0]
    const students = []

    const getStudent = async (idx) => {
      return new Promise(async (resolve, reject) => {
        const [ name, country, uni ] = await Promise.all([ 
          this.getStudentName(idx, {from: nextProps.accounts[0] }), 
          this.getStudentUni(idx, {from: nextProps.accounts[0] }), 
          this.getStudentCountry(idx, {from: nextProps.accounts[0] })
        ]);
        const newStudent = { name, country, uni }
        students.push(newStudent)
        resolve(idx + 1);
      });
    }
    await promiseWhile(0, i => i < count, getStudent);
    this.setState({ students })
  }

  render() {
    return (
      <StyledFunder>
        <Container text>

            <Header as ='h1'>Find Students</Header>
            <div>
            { this.state.students.map(student => <div key={student.name}>

              <Card.Group>
                <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src='#' />
                      <Card.Header>
                        {this.state.name}
                      </Card.Header>
                    
                      <Card.Description>
                        {this.state.country}
                      </Card.Description>
         
                       <Card.Description>
                        {this.state.university}
                       </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='green'>Fund This Student</Button>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src='#' />
                      <Card.Header>
                        {this.state.name}
                      </Card.Header>
                    
                      <Card.Description>
                        {this.state.country}
                      </Card.Description>
         
                       <Card.Description>
                        {this.state.university}
                       </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='green'>Fund This Student</Button>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src='#' />
                      <Card.Header>
                        {this.state.name}
                      </Card.Header>
                    
                      <Card.Description>
                        {this.state.country}
                      </Card.Description>
         
                       <Card.Description>
                        {this.state.university}
                       </Card.Description>

                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='green'>Fund This Student</Button>
                    </Card.Content>
                </Card>
              </Card.Group>
              </div>)
            }
            </div>
          </Container>

      </StyledFunder>
    )
  }
}

export default FunderHome;