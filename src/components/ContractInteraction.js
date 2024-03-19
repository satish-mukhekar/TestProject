// src/components/ContractInteraction.js

import React, { useState } from 'react';
import Web3 from "web3";
import { contractAbi } from "../ABI/contractabi";
import { aproveabi } from "../ABI/aprove.js";
import "../css/ContractInteraction.css";

// Constants
const RPCUrl = "https://rpc-mumbai.maticvigil.com";
const ContractaddressStake = "0x80172E1828fEB51267a7B938AE5a61cA6c0946CE";
const tokencontractaddress = "0x3eaC1E98dd13F76DC238DBbfe2F1A5E5672C14db";
const abistakingcontract = contractAbi;
const abiapprove = aproveabi;

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider(RPCUrl));

// Function to get approval for staking
export const getApprove = async (amount) => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        console.log(account)
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abiapprove, tokencontractaddress);

        try {
            const stakingTx = await contracts.methods.approve(ContractaddressStake, amount).send({ from: account });
            console.log("Staking transaction:", stakingTx);
        } catch (error) {
            console.error("Error while staking:", error);
        }
    }
};

// Function to stake tokens
export const stakeTokens = async (amount) => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abistakingcontract, ContractaddressStake);

        try {
            const stakingTx = await contracts.methods.stake(amount).send({ from: account });
            console.log("Staking transaction:", stakingTx);
        } catch (error) {
            console.error("Error while staking:", error);
        }
    }
};

// Function to unstake tokens
export const unstakeTokens = async (amount) => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abistakingcontract, ContractaddressStake);

        try {
            const unstakingTx = await contracts.methods.unstake(amount).send({ from: account });
            console.log("Unstaking transaction:", unstakingTx);
        } catch (error) {
            console.error("Error while unstaking:", error);
        }
    }
};

// Function to claim rewards
export const claimRewards = async () => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abistakingcontract, ContractaddressStake);

        try {
            const claimTx = await contracts.methods.claimRewards().send({ from: account });
            console.log("Claim rewards transaction:", claimTx);
        } catch (error) {
            console.error("Error while claiming rewards:", error);
        }
    }
};

// Function to get details
export const getDetails = async () => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abistakingcontract, ContractaddressStake);

        try {
            const response = await contracts.methods.getDetails().call({ from: account });
            return response; // Return the response
        } catch (error) {
            console.error("Error while getting details:", error);
            return null; // Return null on error
        }
    }
};

// Function to get staker info
export const getStakerInfo = async () => {
    // Check if Ethereum provider is available
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const currentChainId = await web3.eth.net.getId();
        if (currentChainId !== 80001) {
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(80001) }],
            });
        }
        const contracts = new web3.eth.Contract(abistakingcontract, ContractaddressStake);

        try {
            const response = await contracts.methods.getStakerInfo(account).call({ from: account });
            return response; // Return the response
        } catch (error) {
            console.error("Error while getting staker info:", error);
            return null; // Return null on error
        }
    }
};

// ContractInteraction component
const ContractInteraction = () => {
    // State variables
    const [amount, setAmount] = useState('');
    const [detailsResponse, setDetailsResponse] = useState('');
    const [stakerInfoResponse, setStakerInfoResponse] = useState('');

    // Function to handle approval
    const handleapprove = async () => {
        await getApprove(amount);
    };

    // Function to handle staking
    const handleStake = async () => {
        await stakeTokens(amount);
    };

    // Function to handle unstaking
    const handleUnstake = async () => {
        await unstakeTokens(amount);
    };

    // Function to handle claiming rewards
    const handleClaimRewards = async () => {
        await claimRewards();
    };

    // Function to handle getting details
    const handlegetDetails = async () => {
        const response = await getDetails();
        console.log("Details Response:", response); // Log the response
        // Format the response data for display
        const formattedResponse = `
            isPaused: ${response.isPaused},
            resetClaimDelay: ${response.resetClaimDelay},
            stakeToken: ${response.stakeToken},
            rewardToken: ${response.rewardToken},
            startBlock: ${response.startBlock},
            endBlock: ${response.endBlock},
            claimDelay: ${response.claimDelay},
            totalRewards: ${response.totalRewards},
            totalFundsStaked: ${response.totalFundsStaked},
            totalRewardsDistributed: ${response.totalRewardsDistributed}
        `;
        setDetailsResponse(formattedResponse);
    };

    // Function to handle getting staker info
    const handlegetinfo = async () => {
        const response = await getStakerInfo();
        console.log("Staker Info Response:", response); // Log the response
        // Format the response data for display
        const formattedResponse = `
            exist: ${response.exist},
            stakedAmount: ${response.stakedAmount},
            unclaimedRewards: ${response.unclaimedRewards},
            claimCheckpoint: ${response.claimCheckpoint},
            totalRewardsClaimed: ${response.totalRewardsClaimed}
        `;
        setStakerInfoResponse(formattedResponse);
    };

    // ContractInteraction component JSX
    return (
        <div className="contract-interaction">
            <p>Get approved to stake</p>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
            />
            <button onClick={handleapprove} className="action-button">Get Approved</button>
            <button onClick={handleStake} className="action-button">Stake Tokens</button>
            <button onClick={handleUnstake} className="action-button">Unstake Tokens</button>
            <button onClick={handleClaimRewards} className="action-button">Claim Rewards</button>
            <button onClick={handlegetDetails} className="action-button">Get Details</button>
            <button onClick={handlegetinfo} className="action-button">Get Staker Info</button>
            <div className="response-display">
                <p>Details Response: {detailsResponse}</p>
                <p>Staker Info Response: {stakerInfoResponse}</p>
            </div>
        </div>
    );
};

export default ContractInteraction;
