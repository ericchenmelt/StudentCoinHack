pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;


contract Accounts {
	uint numLenders = 0;
	uint numStudents = 0;
	mapping(address => mapping (address => uint)) public pledges;

	struct Student {
		string name;
		string university;
		address studentAccount;
		uint minimumToRaise;
		uint totalRaised;
		uint idx;
		bool fundraising;
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
			idx: numStudents,
			fundraising: true
		});

		studentMap[msg.sender] = sNew;
		slist.push(sNew);

		numStudents += 1;

	}
	
	
	function addLender(string lName)
		public returns (Lender){
		var lNew = Lender({
			name: lName,
			acc: msg.sender,
			balance: msg.sender.balance,
			totalDonated: 0,
			idx: numLenders
		});

		lenderMap[msg.sender] = lNew;
		llist.push(lNew);

		numLenders += 1;

		return lNew;

	}

	function fund(address stdntAcct) public payable {
		//require(!fundraising);
		uint amount = msg.value;
		require(lenderMap[msg.sender].balance >= amount);
		require(studentMap[stdntAcct].fundraising);
		pledges[msg.sender][stdntAcct] += amount;
		studentMap[stdntAcct].totalRaised += amount;
		lenderMap[msg.sender].balance -= amount;
		lenderMap[msg.sender].totalDonated += amount;
		checkGoalReached(stdntAcct);
	}
	
	function checkGoalReached(address stdntAcct) public {
		if(studentMap[stdntAcct].totalRaised >= studentMap[stdntAcct].minimumToRaise){
			studentMap[stdntAcct].fundraising = true;
		}
	}

	//Not sure when to call safeWithdrawl
	

	
	//function listStudents() public returns(Student[]) { return slist; }

	/* hideos but :) */

	function getStudentNameIdx(uint idx) public view returns(string) { return slist[idx].name; }
	function getStudentUniIdx(uint idx) public view returns(string) { return slist[idx].university; }
	function getStudentAccIdx(uint idx) public view returns(address) {
		
		return slist[idx].studentAccount; }
	function getStudentMinReqIdx(uint idx) public view returns(uint) { return slist[idx].minimumToRaise; }
	function getStudentRaisedIdx(uint idx) public view returns(uint) { return slist[idx].totalRaised; }
	//function listStudents() public returns(Student[]) { return slist; }

	function getStudentByAddress() public view returns(string) {
	return studentMap[msg.sender].name; 
}
	function getLenderByAddress() public view returns(string) { return lenderMap[msg.sender].name; }

	function getStudentCount() public view returns(uint) { return numStudents; }
	function gitLenderCount() public view returns(uint) { return numLenders; }
	
}
