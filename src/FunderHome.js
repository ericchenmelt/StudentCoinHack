// @flow
import React, { Component } from 'react'

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
      <div>
      { this.state.students.map(student => <div key={student.name}>
          <p>hi i'm {student.name} </p>
          <p>hi i'm {student.country} </p>
          <p>hi i'm {student.uni} </p>
        </div>)
      }
      </div>
    )
  }
}

export default FunderHome;