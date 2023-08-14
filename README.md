# Ourcolor

<img width="450" alt="screenshot" src="https://raw.githubusercontent.com/0xrhsmt/ourcolor/main/docs/assets/ourcolor.png">

This project is a tool that allows you to create fully on-chain Zora Open Edition NFTs of colors.
Anyone can easily create NFTs of their favorite colors.

However, there are some steps involved and a gaming element to obtaining your preferred color.
First, you must burn the necessary color NFTs to create your desired color NFT.
This means that in order to obtain your favorite color, you will need to pay a moderate fee.

However, you can also receive a reward.
If someone else mints the color you created, you receive a portion of the rewards.
If you create popular colors early on, you might be able to be rich.

## Game Rules

### Color Token

Each Color token has an RGB value. The values can be specified between 0 and 255.<br>
For instance, a color token with `rgb(255, 0, 0)` represents a red token.

### New Color Creation

<img width="450" alt="screenshot" src="https://raw.githubusercontent.com/0xrhsmt/ourcolor/main/docs/assets/newcolor.png">

1. mint existing color token to create new color
2. send tokens to ourcolor contract and burn color token
3. create new color

#### Example

if you burn 100 tokens of  `rgb (1, 0, 0)` and another 100 tokens of `rgb (0, 100, 0)` <br>
you can create `rgb (100, 100, 0)` color

### Reward

<img width="450" alt="screenshot" src="https://raw.githubusercontent.com/0xrhsmt/ourcolor/main/docs/assets/rewards.png">


1. When someone mints the color you created
2. You receive a portion of the reward
3. someone get the color token

For details on the reward system, please refer to [Zora Protocol Rewards](https://docs.zora.co/docs/smart-contracts/creator-tools/rewards)

## Development

### Prerequisites

* [node (>= 18.x.x)](https://nodejs.org/en)
* [pnpm (>= 8.x.x)](https://pnpm.io/)
* [foundry](https://book.getfoundry.sh/)

### Local Development

```
$cd packages/app
$pnpm run dev
```

### Contract Deployment


```
$cd packages/contracts
$forge script script/Deploy.s.sol:DeployScript --rpc-url https://testnet.rpc.zora.energy --broadcast
$pnpm exec wagmi generate 
```

## Acknowledges

* [Zora](zora.co)
* [Optimism](https://www.optimism.io/)
* [Base](https://base.org/)