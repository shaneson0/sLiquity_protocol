/*
 * @Author: your name
 * @Date: 2021-09-13 02:39:50
 * @LastEditTime: 2021-09-13 19:35:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sLiquityProtocol/migrations/1_initial_migration.js
 */
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};




