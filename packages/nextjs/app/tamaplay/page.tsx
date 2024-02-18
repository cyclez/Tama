"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";

import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "Tama",
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


  const { data: tamaContractData } = useDeployedContractInfo("Tama");

  const { writeAsync: approveTamaFood } = useScaffoldContractWrite({
    contractName: "TamaFood",
    functionName: "approve",
    args: [tamaContractData?.address, BigInt(500000000000000000000)]
  });

  function goHome(){
    window.location.href = '/';
  }

  function goTamafoodmint(){
    window.location.href = 'tamafoodmint';
  }

  const startTime = gameData ? gameData[1] : 0;


  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        
        <div className="text-sm font-semibold">
          Number of TAMA owned: {balanceOf?.toString()}
          TAMA TOKEN ID <strong>{balanceOf && balanceOf > 0 ? tokenID?.toString() : "none"}</strong>
        </div>

        <div className="p-5">
          <button className="btn btn-primary" onClick={start} disabled={startTime != BigInt(0)}>
            START
          </button>
        </div>
        <div className="p-5">
          <button className="btn btn-primary" onClick={play}>
            PLAY
          </button>
        </div>
        <div className="p-5">
          <button className="btn btn-primary" onClick={approveTamaFood}>
            APPROVE EAT
          </button>
        </div>
        <div className="p-5">
          <button className="btn btn-primary" onClick={eat}>
            EAT
          </button>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
            <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
                <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                🍇🍍🍌🍗🥩🥕
                <p>
                    <strong>MINT TAMAFOOD</strong>
                    <br /><br />
                    <button className="btn btn-primary" onClick={goTamafoodmint}>
                    MINT NOW
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
