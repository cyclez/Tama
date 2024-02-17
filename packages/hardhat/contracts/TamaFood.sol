import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TamaFood is ERC20, Ownable {
	uint256 pricePerEth = 1000;

	constructor() ERC20("TamaFood", "TAFOO") Ownable(msg.sender) {}

	function mint(address to) public payable {
		require(msg.value != 0, "No ETH sent");
		uint256 amount = (msg.value * pricePerEth);
		_mint(to, amount);
	}

	function setPricePerEth(uint256 _pricePerEth) external onlyOwner {
		pricePerEth = _pricePerEth;
	}
}