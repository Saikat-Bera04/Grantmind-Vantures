// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title GrantMindDAO
 * @dev Main contract for AI-powered grant allocation with DAO voting
 */
contract GrantMindDAO is AccessControlEnumerable, ReentrancyGuard, Pausable {
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");
    bytes32 public constant EVALUATOR_ROLE = keccak256("EVALUATOR_ROLE");
    bytes32 public constant AI_ORACLE_ROLE = keccak256("AI_ORACLE_ROLE");
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string ipfsHash;
        uint256 requestedAmount;
        uint256 aiScore; // Score out of 100
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 createdAt;
        uint256 votingEnds;
        ProposalStatus status;
        bool fundsReleased;
        mapping(address => bool) hasVoted;
    }
    
    enum ProposalStatus {
        Pending,        // Waiting for AI evaluation
        Active,         // Open for voting
        Approved,       // Voting passed
        Rejected,       // Voting failed
        Executed,       // Funds distributed
        Cancelled       // Cancelled by admin
    }
    
    // State variables
    uint256 public proposalCount;
    uint256 public treasuryBalance;
    uint256 public minAIScore = 60; // Minimum AI score to be eligible for voting
    uint256 public votingPeriod = 7 days;
    uint256 public quorumPercentage = 20; // 20% of members must vote
    uint256 public approvalThreshold = 60; // 60% approval needed
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public memberReputation;
    address[] public members;
    
    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 requestedAmount
    );
    
    event AIScoreSubmitted(
        uint256 indexed proposalId,
        uint256 aiScore,
        address indexed oracle
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 votesFor,
        uint256 votesAgainst
    );
    
    event ProposalFinalized(
        uint256 indexed proposalId,
        ProposalStatus status,
        uint256 finalVotesFor,
        uint256 finalVotesAgainst
    );
    
    event FundsReleased(
        uint256 indexed proposalId,
        address indexed recipient,
        uint256 amount
    );
    
    event TreasuryDeposit(address indexed from, uint256 amount);
    
    event ReputationAwarded(address indexed member, uint256 points);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MEMBER_ROLE, msg.sender);
        _grantRole(EVALUATOR_ROLE, msg.sender);
    }
    
    /**
     * @dev Deposit funds to treasury
     */
    function depositToTreasury() external payable {
        require(msg.value > 0, "Must deposit some amount");
        treasuryBalance += msg.value;
        emit TreasuryDeposit(msg.sender, msg.value);
    }
    
    /**
     * @dev Create a new proposal
     * @param _title Proposal title
     * @param _description Proposal description
     * @param _ipfsHash IPFS hash containing full proposal details
     * @param _requestedAmount Amount of CELO requested
     */
    function createProposal(
        string memory _title,
        string memory _description,
        string memory _ipfsHash,
        uint256 _requestedAmount
    ) external onlyRole(MEMBER_ROLE) whenNotPaused returns (uint256) {
        require(_requestedAmount > 0, "Amount must be > 0");
        require(_requestedAmount <= treasuryBalance, "Insufficient treasury");
        require(bytes(_title).length > 0, "Title required");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.title = _title;
        newProposal.description = _description;
        newProposal.ipfsHash = _ipfsHash;
        newProposal.requestedAmount = _requestedAmount;
        newProposal.createdAt = block.timestamp;
        newProposal.status = ProposalStatus.Pending;
        
        emit ProposalCreated(proposalCount, msg.sender, _title, _requestedAmount);
        
        return proposalCount;
    }
    
    /**
     * @dev Submit AI evaluation score (called by AI Oracle)
     * @param _proposalId Proposal ID
     * @param _aiScore AI score (0-100)
     */
    function submitAIScore(
        uint256 _proposalId,
        uint256 _aiScore
    ) external onlyRole(AI_ORACLE_ROLE) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.status == ProposalStatus.Pending, "Not in pending status");
        require(_aiScore <= 100, "Score must be 0-100");
        
        proposal.aiScore = _aiScore;
        
        if (_aiScore >= minAIScore) {
            proposal.status = ProposalStatus.Active;
            proposal.votingEnds = block.timestamp + votingPeriod;
        } else {
            proposal.status = ProposalStatus.Rejected;
        }
        
        emit AIScoreSubmitted(_proposalId, _aiScore, msg.sender);
    }
    
    /**
     * @dev Vote on a proposal
     * @param _proposalId Proposal ID
     * @param _support True for yes, false for no
     */
    function voteOnProposal(
        uint256 _proposalId,
        bool _support
    ) external onlyRole(MEMBER_ROLE) whenNotPaused {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Voting not active");
        require(block.timestamp < proposal.votingEnds, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        // Award reputation for voting
        memberReputation[msg.sender] += 1;
        
        emit VoteCast(_proposalId, msg.sender, _support, proposal.votesFor, proposal.votesAgainst);
        emit ReputationAwarded(msg.sender, 1);
    }
    
    /**
     * @dev Finalize proposal after voting period
     * @param _proposalId Proposal ID
     */
    function finalizeProposal(uint256 _proposalId) external nonReentrant {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Active, "Not in active status");
        require(block.timestamp >= proposal.votingEnds, "Voting still ongoing");
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 memberCount = getRoleMemberCount(MEMBER_ROLE);
        
        // Check quorum
        bool quorumReached = (totalVotes * 100) >= (memberCount * quorumPercentage);
        
        // Check approval threshold
        bool approved = false;
        if (totalVotes > 0) {
            approved = (proposal.votesFor * 100) >= (totalVotes * approvalThreshold);
        }
        
        if (quorumReached && approved) {
            proposal.status = ProposalStatus.Approved;
        } else {
            proposal.status = ProposalStatus.Rejected;
        }
        
        emit ProposalFinalized(
            _proposalId,
            proposal.status,
            proposal.votesFor,
            proposal.votesAgainst
        );
    }
    
    /**
     * @dev Release funds to approved proposal
     * @param _proposalId Proposal ID
     */
    function releaseFunds(uint256 _proposalId) external nonReentrant {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[_proposalId];
        
        require(proposal.status == ProposalStatus.Approved, "Not approved");
        require(!proposal.fundsReleased, "Funds already released");
        require(treasuryBalance >= proposal.requestedAmount, "Insufficient treasury");
        
        proposal.fundsReleased = true;
        proposal.status = ProposalStatus.Executed;
        treasuryBalance -= proposal.requestedAmount;
        
        // Award reputation to proposer
        memberReputation[proposal.proposer] += 10;
        
        (bool success, ) = payable(proposal.proposer).call{value: proposal.requestedAmount}("");
        require(success, "Transfer failed");
        
        emit FundsReleased(_proposalId, proposal.proposer, proposal.requestedAmount);
        emit ReputationAwarded(proposal.proposer, 10);
    }
    
    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 _proposalId) external view returns (
        uint256 id,
        address proposer,
        string memory title,
        string memory description,
        string memory ipfsHash,
        uint256 requestedAmount,
        uint256 aiScore,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 createdAt,
        uint256 votingEnds,
        ProposalStatus status,
        bool fundsReleased
    ) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal");
        Proposal storage p = proposals[_proposalId];
        
        return (
            p.id,
            p.proposer,
            p.title,
            p.description,
            p.ipfsHash,
            p.requestedAmount,
            p.aiScore,
            p.votesFor,
            p.votesAgainst,
            p.createdAt,
            p.votingEnds,
            p.status,
            p.fundsReleased
        );
    }
    
    /**
     * @dev Check if address has voted
     */
    function hasVoted(uint256 _proposalId, address _voter) external view returns (bool) {
        return proposals[_proposalId].hasVoted[_voter];
    }
    
    /**
     * @dev Add member
     */
    function addMember(address _member) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MEMBER_ROLE, _member);
        members.push(_member);
    }
    
    /**
     * @dev Add AI Oracle
     */
    function addAIOracle(address _oracle) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(AI_ORACLE_ROLE, _oracle);
    }
    
    /**
     * @dev Add Evaluator
     */
    function addEvaluator(address _evaluator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(EVALUATOR_ROLE, _evaluator);
    }
    
    /**
     * @dev Update voting parameters
     */
    function updateVotingParams(
        uint256 _votingPeriod,
        uint256 _quorumPercentage,
        uint256 _approvalThreshold,
        uint256 _minAIScore
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        votingPeriod = _votingPeriod;
        quorumPercentage = _quorumPercentage;
        approvalThreshold = _approvalThreshold;
        minAIScore = _minAIScore;
    }
    
    /**
     * @dev Pause contract
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    /**
     * @dev Get member count
     */
    function getMemberCount() external view returns (uint256) {
        return getRoleMemberCount(MEMBER_ROLE);
    }
    
    receive() external payable {
        treasuryBalance += msg.value;
        emit TreasuryDeposit(msg.sender, msg.value);
    }
}