// @flow
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Input, Button, Card, Image, Container, Header } from 'semantic-ui-react'
import styled from 'styled-components';
import Grad from './images/grad.svg'

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
    students: [],
    uniFilter: null
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
    const filteredStudents = this.state.students.filter(student => !this.state.uniFilter || student.uni.indexOf(this.state.uniFilter) != -1)
    return (
      <div>
        <p>Filter by university</p>
        <Input icon='search' placeholder='Search...' onChange={(e) => this.setState({uniFilter: e.target.value}) }/>
      <StyledFunder>
        <Container text>
            <Header as ='h1'>Find Students</Header>
            <div>
            { filteredStudents.map(student => <div key={student.name}>

              <Card.Group>
                <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src='#' />
                      <Card.Header>
                        {student.name}
                      </Card.Header>
                    
                      <Card.Description>

                        <p>Going to {student.uni}</p>
                        <p>From {student.country}</p>

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
      </div>

    )
  }
}

export default FunderHome;