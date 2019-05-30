import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var infoContract = web3.eth.contract([
{
"anonymous": false,
"inputs": [
    {
        "indexed": false,
        "name": "name",
        "type": "string"
    },
    {
        "indexed": false,
        "name": "age",
        "type": "uint256"
    }
],
"name": "Instructor",
"type": "event"
},
{
"constant": false,
"inputs": [
    {
        "name": "_fName",
        "type": "string"
    },
    {
        "name": "_age",
        "type": "uint256"
    }
],
"name": "setInfo",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "getInfo",
"outputs": [
    {
        "name": "",
        "type": "string"
    },
    {
        "name": "",
        "type": "uint256"
    }
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]);

var info = infoContract.at('0xbf1d3fa8c7dbe5f31a029d2788bed143caeb7317');

var instructorEvent = info.Instructor();
instructorEvent.watch(function(error, result){
    if (!error)
        {
            $("#loader").hide();
            $("#info").html(result.args.name + ' (' + result.args.age + ' years old)');
        } else {
            $("#loader").hide();
            console.log(error);
        }
});

$("#button").click(function() {
    $("#loader").show();
    info.setInfo($("#name").val(), $("#age").val());
});
