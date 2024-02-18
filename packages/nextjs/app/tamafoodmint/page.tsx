"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MouseEventHandler, useState } from "react";
import {
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [foodAmount, setNewFoodAmount] = useState(BigInt(1));

  // const { data: balanceOfERC20 } = useScaffoldContractRead({
  //   contractName: "TamaFood",
  //   functionName: "balanceOf",
  //   args: [connectedAddress],
  // });

  // const { data: tokenID } = useScaffoldContractRead({
  //   contractName: "Tama",
  //   functionName: "tokenOfOwnerByIndex",
  //   args: [connectedAddress, BigInt(0)],
  // });

  const handleMintTamaFood: MouseEventHandler<HTMLButtonElement> = () => {
    return mintTamaFood;
  };

  const { writeAsync: mintTamaFood } = useScaffoldContractWrite({
    contractName: "TamaFood",
    functionName: "mint",
    args: [connectedAddress],
    value: foodAmount,
  });

  function goTamaplay(){
    window.location.href = 'tamaplay';
  }

  function goHome(){
    window.location.href = '/';
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="text-4xl font-bold text-gray-900">TAMA FOOD SHOP</h1>
        <div className="p-5">
          <input
            value={foodAmount.toString()}
            placeholder="1000 wei for 1 TAMA"
            className="input"
            size={5}
            onChange={(e) => setNewFoodAmount(BigInt(e.target.value))}
          />&nbsp;&nbsp;&nbsp;WEI
          <br/><br/>
          <button className="btn btn-primary" onClick={handleMintTamaFood}>
            MINT TAMAFOOD
          </button>
          <p>1 ETHER for 1000 TAMA</p>
          <p>1 ETHER = 1000000000000000000 WEI</p>

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
