pragma solidity ^0.4.18;

contract Accounts {

	struct Student {
		string name;
		string university;
		address studentAccount;
		uint minimumToRaise;
		uint totalRaised;
	}
	
	struct Lender {
		// string name;
		address acc;
		uint totalDonated;
	}

	mapping (address => Student) public studentMap;
	mapping (address => Lender) public lenderMap;

	function addStudent(string sName, string uni, uint minRaise)
		public returns (Student){
		var sNew = Student({
			name: sName,
			university: uni,
			studentAccount: msg.sender,
			minimumToRaise: minRaise,
			totalRaised: 0
		});

		studentMap[msg.sender] = sNew;

		return sNew;

	}
	
	
	function addLender(string lName)
		public returns (Lender){
		var lNew = Lender({
			acc: msg.sender,
			totalDonated: 0
		});

		lenderMap[msg.sender] = lNew;

		return lNew;

	}





}
