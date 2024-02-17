// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Character0 {
    //SEBIRATCHI
    using Strings for uint256;

    function generateCharacter() public pure returns (string memory) {
        bytes memory svg = abi.encodePacked(
            // '<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg5103" viewBox="0 0 215.41 292.71" version="1.0">',
            // '<g id="layer1" transform="translate(-23.4 -39.669)">',
            // '<g id="g8146" transform="matrix(.75102 0 0 .75102 -4.5037 -10.766)">',
            // '<g id="g8152" fill-rule="evenodd" transform="matrix(.75052 0 0 .75052 -216.14 -311.21)">',
            // '<path id="path2167" stroke-linejoin="round" d="m717.14 823.8c1.12 105.96-68.16 197.1-184.29 197.1-116.12 0-193.62-60.06-192.85-205.67 0.75-145.94 96.77-306.47 184.28-308.57 93.35-2.31 191.19 155.92 192.86 317.14z" stroke="#000" stroke-linecap="round" stroke-width="5" fill="#fffad1"/>',
            // '<path id="path3139" d="m651.28 624.06c-5.83 1.31-2.42 9.29-0.69 13 23.63 65.18 34 137.07 21 205.98-14.39 63.4-60.88 120.71-123.6 140.81-26.22 9.1-54.32 11.1-81.87 11.04-4.47 1.82-2.54 7.71 1.76 8.21 54.16 15.3 116.15 12.4 164.2-19 47.68-31.7 74.44-88.89 75.5-145.41 2.6-57.93-10.88-115.44-31.62-169.2-6.37-15.49-12.98-31.13-22.55-44.93-0.59-0.49-1.39-0.67-2.13-0.5z" fill="#807b00" fill-opacity=".25098"/>',
            // '<path id="path4257" stroke-linejoin="round" d="m492.46 621.45c-5.68 23.03-8.36 31.25-26.43 34.34-12.46 2.13-25.01-9.67-20.73-32.92 3.44-18.64 17.62-37.46 33.58-40.06 17.6-2.85 18.18 20.02 13.58 38.64z" fill-opacity=".49804" stroke="#000" stroke-linecap="round" stroke-width="2" fill="#fff"/>',
            // "</g>",
            // "</g>",
            // "</g>",
            "<svg></svg>"
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