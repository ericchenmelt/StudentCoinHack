pragma solidity ^0.4.18;

contract Accounts {
	uint numLenders = 0;
	uint numStudents = 0;

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

	function addStudent(string sName, string uni, uint minRaise)
		public returns (Student){
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

		return sNew;

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




	function listStudents() public returns(Student[]) { return slist; }
	function listLenders() public returns(Lender[]) { return llist; }

}
