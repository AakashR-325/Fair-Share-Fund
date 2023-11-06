// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract FairShareFund {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    uint256 public membershipFee = 0.1 ether;
    uint256 public totalQF = 0;
    uint256 public totalFund = 0;
    uint256 public fundingPeriod = 86400;

    struct org {
        string name;
        string description;
        address orgAddress;
    }

    org[] orgs;
    mapping(address => bool) private members;
    mapping(address => address[]) public orgToFunders;
    mapping(address => mapping(address => uint256)) public orgToFunderToAmount;
    mapping(address => uint256) public orgToQF;
    mapping(address => uint256) public orgToAllocation;
    mapping(address => mapping(address => bool)) public funded;

    modifier notMember() {
        require(!members[msg.sender], "Already a member");
        _;
    }

    modifier isMember() {
        require(members[msg.sender], "Not a member");
        _;
    }

    //Taken from uniswap code base.
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function addOrg(
        address _org,
        string memory _name,
        string memory _desc
    ) external {
        orgs.push(org(_name, _desc, _org));
    }

    function becomeMember() external payable notMember {
        require(msg.value >= membershipFee, "Not enough ETH sent");
        members[msg.sender] = true;
    }

    function fundOrg(address _org) external payable isMember {
        orgToFunderToAmount[_org][msg.sender] = msg.value;
        if (!funded[_org][msg.sender]) {
            orgToFunders[_org].push(msg.sender);
            funded[_org][msg.sender] = true;
        }
        totalFund += msg.value;
        totalQF += sqrt(orgToFunderToAmount[_org][msg.sender]);
        orgToQF[_org] += sqrt(orgToFunderToAmount[_org][msg.sender]);
    }

    function orgAllocation(address _org) public view returns (uint256) {
        return ((totalFund * orgToQF[_org]) / totalQF);
    }

    function sendAllocation() external {
        for (uint i = 0; i < orgs.length; i++) {
            address addr = orgs[i].orgAddress;
            uint256 amount = orgAllocation(addr);
            (bool sent, ) = addr.call{value: amount}("");
            require(sent, "call to send ETH failed");
        }
    }
}
