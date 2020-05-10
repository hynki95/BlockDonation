pragma solidity 0.5.13; //+commit.5a6ea5b1.Emscripten.clang

import "./ERC20.sol";
import "./Ownable.sol";

contract Donut is ERC20,Ownable {

    string public name             = "DONUT";
    string public symbol           = "DN";
    uint   public decimals         = 1;
    using SafeMath for uint256;
     
    uint public Campaign_index;
    mapping(uint=>campaign) public campaigns;
    mapping(address=>campaign) public campaigns_address;
 
     struct campaign{
     string campaign_name;
     string project_name;
     string date;
     string realaccount;
     address campaign_address;
     uint  numFunders;
     uint fundedAmount;
     uint fund_goal;
     uint Campaign_index;
    //  mapping(uint => funder) funders;
     }
    //  uint Funder_index;
     mapping(address => funder) public funderInfo;
     struct funder{
        uint amount;
        mapping(uint =>funded_lsit) funded_index;
     }
     
     struct funded_lsit{
     uint amountByID;
     uint amountCount;
     }
     
    //  uint Trx_index;
    //  mapping (uint =>usage) public Trx_usage;
     
    //  struct usage{
    //  address user;
    //  string usage_to;
    //  uint usage_value;
    //  }
    
    uint public all_fund;
    
   
     
   constructor () public {
    // uint total_fund=0;     
    // uint all_fund=0;
    _mint(msg.sender ,210000000 * 10 ** decimals );	//
    }
    
     
    function newCampaign(string memory campaign_name,string memory project_name, string memory date, string memory realaccount,  address beneficiary, uint fund_goal) public {
        campaigns[Campaign_index] = campaign(campaign_name,project_name,date,realaccount,beneficiary,0,0,fund_goal,Campaign_index);
        campaigns_address[msg.sender] = campaign(campaign_name,project_name,date,realaccount,beneficiary,0,0,fund_goal,Campaign_index);
        Campaign_index++;
    }
    
    event contribute_log(address indexed contributer, uint indexed campaignID, uint _amount);
    function contribute(uint campaignID, uint _amount) public{
        all_fund = all_fund.add(_amount);
        campaigns[campaignID].numFunders = campaigns[campaignID].numFunders.add(1) ;
        campaigns[campaignID].fundedAmount=campaigns[campaignID].fundedAmount.add(_amount);
        campaigns_address[msg.sender].numFunders = campaigns_address[msg.sender].numFunders.add(1) ;
        campaigns_address[msg.sender].fundedAmount=campaigns_address[msg.sender].fundedAmount.add(_amount);
        funderInfo[msg.sender].amount = funderInfo[msg.sender].amount.add(_amount);
        funderInfo[msg.sender].funded_index[campaignID].amountByID=funderInfo[msg.sender].funded_index[campaignID].amountByID.add(_amount);
        funderInfo[msg.sender].funded_index[campaignID].amountCount.add(1);
        transfer(campaigns[campaignID].campaign_address,_amount);
        
        emit contribute_log(msg.sender,campaignID,_amount);
    }
    event use_money_log(address indexed user,uint send_amount, string usage);
    
    function use_money( uint campaignID, uint _amount, string memory _usage) public{
        require(_amount <= campaigns[campaignID].fundedAmount);
        require(msg.sender == campaigns[campaignID].campaign_address);
        transfer(address(this),_amount);
        emit use_money_log(msg.sender,_amount,_usage);
    }
    function withdraw(uint _amount) public onlyOwner{
        transfer(msg.sender,_amount);
    }
  }






