// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Character1 {
    //SEBIRATCHI
    using Strings for uint256;

    string[10] public colorNames = [
        "FFFFFF",
        "FF0000",
        "008000",
        "0000FF",
        "FFFF00",
        "00FFFF",
        "800000",
        "808000",
        "800080",
        "808080"
    ];

    function generateRandomNumber(
        uint256 prevEntropy
    ) public view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encode(
                    prevEntropy,
                    block.timestamp,
                    block.prevrandao,
                    blockhash(block.number - 1)
                )
            )
        );
        return uint256(randomNumber % 10);
    }

    function generateCharacter() public view returns (string memory) {
        string[3] memory colors;
        uint256[3] memory previous;
        previous[0] = generateRandomNumber(0);
        colors[0] = colorNames[previous[0]];
        previous[1] = generateRandomNumber(previous[0]);
        colors[1] = colorNames[generateRandomNumber(previous[1])];
        previous[2] = generateRandomNumber(previous[1]);
        colors[2] = colorNames[generateRandomNumber(previous[2])];
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500px" height="500px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">',
            
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }
}