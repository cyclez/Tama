//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vitalikgochi is ERC721, Ownable {

    uint256 immutable eatInterval = 5;
    uint256 immutable playInterval = 5;
    uint256 immutable firstLevelPoints = 100;
    uint256 immutable secondLevelPoints = 1000;

    // The structure that keeps the game status of each token aka TokenScore 
    struct TokenScore {
        uint256 level;
        uint256 points;
        uint256 lastEat;
        uint256 lastPlay;
    }

    // All events emitted: the contract logs eat and play actions and all level changes
    event TokenEat(uint256 tokenId, uint256 points, uint256 level);
    event TokenPlay(uint256 tokenId, uint256 points, uint256 level);
    event TokenLevel0(uint256 tokenId);
    event TokenLevel1(uint256 tokenId);
    event TokenLevel2(uint256 tokenId);
    event TokenLevel3(uint256 tokenId);


    mapping (uint => TokenScore) private _tokenScore;

    // This array holds the first 5 tokens reaching level 3
    address[5] public fastFive;

    modifier onlyTokenOwner(uint256 tokenId) {
       require(msg.sender == ownerOf(tokenId), "Caller is not the Owner");
       _;
   }

    constructor()
        ERC721("Vitalikgotchi", "VGI")
        Ownable(msg.sender)
    {
        for (uint256 i = 0; i < fastFive.length; i++) {
            fastFive[i] = address(0);
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://vitalikgotchi.eth/images/"; //TODO: Implement metadata mngmnt
    }

    function safeMint(address to, uint256 tokenId) public{
        _safeMint(to, tokenId);
        _tokenScore[tokenId].level = 0;
        _tokenScore[tokenId].points = 0;
        _tokenScore[tokenId].lastEat = 0;
        _tokenScore[tokenId].lastPlay = 0;
        emit TokenLevel0(tokenId);
    }

    function showScore(uint256 tokenId) public view returns (TokenScore memory){
        return _tokenScore[tokenId];
    }

    function eat(uint256 tokenId) public onlyTokenOwner(tokenId) {

        _tokenScore[tokenId].lastEat = block.timestamp;
        _tokenScore[tokenId].points += 5;
        emit TokenEat(tokenId, _tokenScore[tokenId].points, _tokenScore[tokenId].level);

        if(_tokenScore[tokenId].level == 0){
            _tokenScore[tokenId].level = 1;
            emit TokenLevel1(tokenId);
        }
        if(_tokenScore[tokenId].level == 1 && _tokenScore[tokenId].points == 100){
            _tokenScore[tokenId].level = 2;
            _tokenScore[tokenId].points = 0;
            emit TokenLevel2(tokenId);
        }
    }

    function play(uint256 tokenId) public onlyTokenOwner(tokenId) payable{
        if(_tokenScore[tokenId].level == 2){
                _tokenScore[tokenId].lastPlay = block.timestamp;
                _tokenScore[tokenId].points += 100;
                emit TokenEat(tokenId, _tokenScore[tokenId].points, _tokenScore[tokenId].level);
        }
        if(_tokenScore[tokenId].points == 1000){
            _tokenScore[tokenId].level = 3;
            emit TokenLevel3(tokenId);
            for (uint256 i = 0; i < fastFive.length; i++) {
                if(fastFive[i] != address(0)){
                    fastFive[i] = address(msg.sender);
                }
            }
        }
    }

}