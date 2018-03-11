pragma solidity ^0.4.18;

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

	function addStudent(string sName, string uni, uint minRaise)
		public returns (Student){
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

		return sNew;

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


	//function listStudents() public returns(Student[]) { return slist; }

	function listStudents() public returns(Student[]) { return slist; }
	function listLenders() public returns(Lender[]) { return llist; }

}
