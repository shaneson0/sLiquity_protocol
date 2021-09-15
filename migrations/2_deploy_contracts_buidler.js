/*
 * @Author: your name
 * @Date: 2021-09-15 19:30:35
 * @LastEditTime: 2021-09-15 20:15:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sLiquityProtocol/migrations/2_deploy_contracts_buidler.js
 */
// Truffle migration script for deployment to Ganache

const SortedTroves = artifacts.require("./SortedTroves.sol")
const ActivePool = artifacts.require("./ActivePool.sol")
const DefaultPool = artifacts.require("./DefaultPool.sol")
const StabilityPool = artifacts.require("./StabilityPool.sol")
const TroveManager = artifacts.require("./TroveManager.sol")
const PriceFeed = artifacts.require("./PriceFeed.sol")
const LUSDToken = artifacts.require("./LUSDToken.sol")
const FunctionCaller = artifacts.require("./FunctionCaller.sol")
const BorrowerOperations = artifacts.require("./BorrowerOperations.sol")

const deploymentHelpers = require("../utils/truffleDeploymentHelpers.js")

const getAddresses = deploymentHelpers.getAddresses
const connectContracts = deploymentHelpers.connectContracts

module.exports = function(deployer) {
  deployer.deploy(BorrowerOperations)
  deployer.deploy(PriceFeed)
  deployer.deploy(SortedTroves)
  deployer.deploy(TroveManager)
  deployer.deploy(ActivePool)
  deployer.deploy(StabilityPool)
  deployer.deploy(DefaultPool)
  deployer.deploy(FunctionCaller)

  deployer.then(async () => {
    const borrowerOperations = await BorrowerOperations.deployed()
    const priceFeed = await PriceFeed.deployed()
    const sortedTroves = await SortedTroves.deployed()
    const troveManager = await TroveManager.deployed()
    const activePool = await ActivePool.deployed()
    const stabilityPool = await StabilityPool.deployed()
    const defaultPool = await DefaultPool.deployed()
    const functionCaller = await FunctionCaller.deployed()

    
    console.log("troveManager.address: ")
    console.log(troveManager.address)

    deployer.deploy(LUSDToken)
    const lusdToken = await LUSDToken.new(
      troveManager.address,
      stabilityPool.address,
      borrowerOperations.address
    )
    LUSDToken.setAsDeployed(lusdToken)
    

    const liquityContracts = {
      borrowerOperations,
      priceFeed,
      lusdToken,
      sortedTroves,
      troveManager,
      activePool,
      stabilityPool,
      defaultPool,
      functionCaller
    }

    // Grab contract addresses
    const liquityAddresses = getAddresses(liquityContracts)
    console.log('deploy_contracts.js - Deployed contract addresses: \n')
    console.log(liquityAddresses)
    console.log('\n')

    // Connect contracts to each other
    await connectContracts(liquityContracts, liquityAddresses)
  })
}
