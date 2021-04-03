const id = "0xEcA19B1a87442b0c25801B809bf567A6ca87B1da";
const axios = require('axios');

const getdata = async (iid)=>{
    const data = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${iid}&startblock=0&endblock=999999999&sort=asc&apikey=K7ST5DC6VP2Z5ZVWWD1IB3JDB5AHIEV274`)
    // const data = await fetch(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${iid}&startblock=0&endblock=999999999&sort=asc&apikey=K7ST5DC6VP2Z5ZVWWD1IB3JDB5AHIEV274`)
    // const json = await JSON.stringify(data)
    return data;
}

let stroagedata = []


const getfiltereddata = async (somedata,did) => {
    return somedata.filter((i,k)=>{
        if(i.to !== did){
            return i
        }
    })
}


async function app (did) {
    const data = await getdata(did)
    // console.log(data)
    // console.log("did = ",did)
    const filtereddata = await getfiltereddata(data.data.result,did)
    // console.log(filtereddata)
    filtereddata.map(data=>{
        console.log({hash:data.hash,from:data.from,to:data.to,amount:parseInt(data.value)/1000000000000000000})
    })
    stroagedata = [...stroagedata,did]
    await filtereddata.map( async (i,x)=>{
        // console.log(stroagedata.includes(i))

        return await  setTimeout( async() => {
            return await app(i.to)
        }, 1000*x); 
    })
}


async function runapp() {
    await app(id)
    // console.log(stroagedata)
}

runapp()


