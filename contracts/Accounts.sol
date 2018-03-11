pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

contract Accounts {
	uint numLenders = 0;
	uint public numStudents = 0;
	uint public lol = 5;

	struct Student {
		string name;
		string university;
		address studentAccount;
		uint minimumToRaise;
		uint totalRaised;
		uint idx;
	}
	
	struct Lender {
		string name;
		address acc;
		uint totalDonated;
		uint balance;
		uint idx;
	}

	mapping (address => Student) public studentMap;
	Student[] public slist;
	
	mapping (address => Lender) public lenderMap;
	Lender[] public llist;

	function incrementStudent(string name) public returns(string) {
		numStudents = numStudents + 1;
		return name;
	}

	function addStudent(string sName, string uni, uint minRaise)
		public {
		var sNew = Student({
			name: sName,
			university: uni,
			studentAccount: msg.sender,
			minimumToRaise: minRaise,
			totalRaised: 0,
			idx: numStudents
		});

		studentMap[msg.sender] = sNew;
		slist.push(sNew);

		numStudents += 1;

		// return sNew;

	}
	
	
	function addLender(string lName)
		public returns (Lender){
		var lNew = Lender({
			name: lName,
			acc: msg.sender,
			balance: 0,
			totalDonated: 0,
			idx: numLenders
		});

		lenderMap[msg.sender] = lNew;
		llist.push(lNew);

		numLenders += 1;

		return lNew;

	}

	//function lenderFund(uint amount) {



	function listStudents() public returns(Student) { 
		var sNew = Student({
			name: "hello",
			university: "world",
			studentAccount: msg.sender,
			minimumToRaise: 100,
			totalRaised: 0,
			idx: 0
		});
		slist.push(sNew);
		return slist[0]; 
	}

	/* hideos but :) */

	function getStudentNameIdx(uint idx) public view returns(string) { return slist[idx].name; }
	function getStudentUniIdx(uint idx) public view returns(string) { return slist[idx].university; }
	function getStudentAccIdx(uint idx) public view returns(address) {
		
		return slist[idx].studentAccount; }
	function getStudentMinReqIdx(uint idx) public view returns(uint) { return slist[idx].minimumToRaise; }
	function getStudentRaisedIdx(uint idx) public view returns(uint) { return slist[idx].totalRaised; }

	function getStudentByAddress() public view returns(string) {
	return studentMap[msg.sender].name; 
}
	function getLenderByAddress() public view returns(string) { return lenderMap[msg.sender].name; }
	function getStudentByAddress(bytes addr) public view returns(string) { return studentMap[bytesToAddress(addr)].name; }


	function getStudentCount() public view returns(uint) { return numStudents; }
	function listLenders() public view returns(Lender[]) { return llist; }
	
}
