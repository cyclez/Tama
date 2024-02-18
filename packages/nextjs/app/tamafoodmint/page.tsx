"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useState } from "react";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, Balance } from "~~/components/scaffold-eth";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [amount, setNewAmount] = useState(BigInt(1));
  const [foodAmount, setNewFoodAmount] = useState(BigInt(1));
  const [selectedTokenID, setTokenID] = useState(BigInt(0));

  const { writeAsync: mintTama } = useScaffoldContractWrite({
    contractName: "Tama",
    functionName: "purchase",
    args: [amount],
    value: BigInt(10000000000000000),
  });

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: balanceOfERC20 } = useScaffoldContractRead({
    contractName: "TamaFood",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: tokenID } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "tokenOfOwnerByIndex",
    args: [connectedAddress, BigInt(0)],
  });

  const { data: gameData } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "gameData",
    args: [tokenID],
  });

  const { writeAsync: start } = useScaffoldContractWrite({
    contractName: "Tama",
    functionName: "start",
    args: [tokenID],
  });

  const { writeAsync: eat } = useScaffoldContractWrite({
    contractName: "Tama",
    functionName: "eat",
    args: [tokenID],
  });

  const { writeAsync: play } = useScaffoldContractWrite({
    contractName: "Tama",
    functionName: "play",
    args: [tokenID],
  });

  const { writeAsync: mintTamaFood } = useScaffoldContractWrite({
    contractName: "TamaFood",
    functionName: "mint",
    args: [connectedAddress],
    value: foodAmount,
  });

  const { data: tamaContractData } = useDeployedContractInfo("Tama");

  const { writeAsync: approveTamaFood } = useScaffoldContractWrite({
    contractName: "TamaFood",
    functionName: "approve",
    args: [tamaContractData?.address, BigInt(500000000000000000000)]
  });

  function goTamaplay(){
    window.location.href = 'tamaplay';
  }

  function goHome(){
    window.location.href = '/';
  }

  const level = gameData ? gameData[0] : 0;
  const startTime = gameData ? gameData[1] : 0;
  const birthDate = new Date(Number(gameData ? gameData[1] : 0) * 1000)
  const lastEat = new Date(Number(gameData ? gameData[2] : 0) * 1000);
  const lastPlay = new Date(Number(gameData ? gameData[3] : 0) * 1000);
  const counter = gameData ? gameData[4] : 0;


  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="text-sm font-semibold">
          Number of TAMA owned: {balanceOf?.toString()}
          TAMA TOKEN ID <strong>{balanceOf && balanceOf > 0 ? tokenID?.toString() : "none"}</strong>
        </div>

        <div className="p-5">
          <div className="text-sm font-semibold">
          Number of TAMAFOOD owned: {balanceOfERC20?.toString()}
          </div>
          <input
            value={foodAmount.toString()}
            placeholder="1000 wei for 1 TAMA"
            className="input"
            onChange={(e) => setNewFoodAmount(BigInt(e.target.value))}
          />
          <button className="btn btn-primary" onClick={mintTamaFood}>
            MINT TAMAFOOD
          </button>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
            <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
                <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                🦦🧸🐔🦄🐩
                <p>
                    <strong>PLAY WITH YOUR TAMA</strong>
                    <br /><br />
                    <button className="btn btn-primary" onClick={goTamaplay}>
                    PLAY NOW
                    </button>
                </p>
                </div>
                <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                🖼️🎨🎭
                <p>
                    <strong>HOW IS IT GOING?</strong>
                    <br /><br />
                    <button className="btn" onClick={goHome}>
                    CHECK YOUR STATS
                    </button>
                </p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;
