contract Greeter {
    /* Define variable greeting of the type string */
    string greeting;
    uint myNumber;
    
    /* This runs when the contract is executed */
    function Greeter(string _greeting, uint _myNumber) public {
        greeting = _greeting;
        myNumber = _myNumber;
    }

    /* Main function */
    function greet(string myString, uint myUint) constant returns (string) {
        return greeting;
    }

    function getMyNumber() constant returns (uint) {
        return myNumber;
    }
}