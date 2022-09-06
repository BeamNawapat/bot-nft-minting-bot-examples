import 'dotenv/config'
import { BytesLike, Contract, ethers, utils } from 'ethers'
import { ABI } from './abi'

import { CronJob } from 'cron'

const privateKey1 = process.env.PRIVATE_KEY1 as BytesLike
const privateKey2 = process.env.PRIVATE_KEY2 as BytesLike
const privateKey3 = process.env.PRIVATE_KEY3 as BytesLike
const privateKey4 = process.env.PRIVATE_KEY4 as BytesLike
const privateKey5 = process.env.PRIVATE_KEY5 as BytesLike
const privateKey6 = process.env.PRIVATE_KEY6 as BytesLike

const RPC = process.env.RPC as string

console.log({ privateKey1: privateKey1, privateKey2: privateKey2, RPC: RPC })

const provider = new ethers.providers.JsonRpcProvider(RPC)
const wallet1 = new ethers.Wallet(privateKey1, provider)
const wallet2 = new ethers.Wallet(privateKey2, provider)
const wallet3 = new ethers.Wallet(privateKey2, provider)
const wallet4 = new ethers.Wallet(privateKey2, provider)
const wallet5 = new ethers.Wallet(privateKey2, provider)
const wallet6 = new ethers.Wallet(privateKey2, provider)

const SmartContract1 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet1,
)
const SmartContract2 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet2,
)
const SmartContract3 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet3,
)
const SmartContract4 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet4,
)
const SmartContract5 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet5,
)
const SmartContract6 = new ethers.Contract(
  '0x8E56343adAFA62DaC9C9A8ac8c742851B0fb8b03',
  ABI,
  wallet6,
)

let isBuyed = false

let isInit = false

// CronJob => setInterval(() => {}, 1000 (ms));

var jobRunner = new CronJob('* * * * * *', async () => {
  let isSale = await SmartContract1.saleIsActive()

  if (!isInit) {
    console.log('Sale is initialized')
    isInit = true
  }

  if (isSale === true && isBuyed === false) {
    isBuyed = true

    console.log('START BUY')

    const options = { value: ethers.utils.parseEther('0.000000001') }
    await SmartContract1.mintToken(1, options)
    await SmartContract2.mintToken(1, options)
    await SmartContract3.mintToken(1, options)
    await SmartContract4.mintToken(1, options)
    await SmartContract5.mintToken(1, options)
    await SmartContract6.mintToken(1, options)

    console.log(`SUCCESS TRANSACTION`)
  }
})

jobRunner.start()
