let fs = require("fs")
// setTimeout(()=>{
//     console.log("hi");
//     setTimeout(()=>{
//         console.log("hello");
//         setTimeout(()=>{
//             console.log("hey there")
//         }, 5000)
//     }, 3000)
// }, 1000)

function setTimeoutPromisified(ms){
    return new Promise((res)=>setTimeout(res, ms));
}

// setTimeoutPromisified(1000)
//     .then(()=>console.log("hi"))
//     .then(()=>setTimeoutPromisified(3000))
//     .then(()=>console.log("hello"))
//     .then(()=>setTimeoutPromisified(5000))
//     .then(()=>console.log("hey there"))



// async function solve(){
//     await setTimeoutPromisified(1000);
//     console.log("hi");
//     await setTimeoutPromisified(3000);
//     console.log("yo");
//     await setTimeoutPromisified(5000);
//     console.log("nono")
// }
// console.log("before solve")
// solve();
// console.log("after solve")


function readFilePromisified(file){
    return new Promise((res, reject)=>{
        fs.readFile(file, 'utf-8', (err, data)=>{
            if(err){
                reject(err)
            }
            else{
                res(data)
            }
        })
        
    })
}

async function solve(){
    let data = await readFilePromisified("a.txt")
    console.log(data)
}

solve()