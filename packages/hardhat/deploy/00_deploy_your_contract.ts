import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Tama", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("TamaFood", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("Character0", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("Character1", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("Character2", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("Character3", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const tamaContract = await hre.ethers.getContract<Contract>("Tama");
  console.log("👋 Tama is deployed!");
  const tamaFoodContract = await hre.ethers.getContract<Contract>("TamaFood");
  console.log("👋 Tamafood is deployed!");

  const character0 = await hre.ethers.getContract<Contract>("Character0");
  console.log("👋 Character0 is deployed!");
  const character1 = await hre.ethers.getContract<Contract>("Character1");
  console.log("👋 Character1 is deployed!");
  const character2 = await hre.ethers.getContract<Contract>("Character2");
  console.log("👋 Character2 is deployed!");
  const character3 = await hre.ethers.getContract<Contract>("Character3");
  console.log("👋 Character3 is deployed!");

  const txHash = await tamaContract.setTamaFoodAddress(tamaFoodContract.getAddress());
  const txHash2 = await tamaContract.setCharacters(
    character0.getAddress(),
    character1.getAddress(),
    character2.getAddress(),
    character3.getAddress()
  );
};

export default deployYourContract;