// ---- using the fetch


// console.clear();
// fetch('https://jsonplaceholder.typicode.com/posts',
// {


//     // -----new post item-----

//   method: 'POST',
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//    },
//    body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }), 
// })




// .then((res)=> {
//     if(!res.ok)
//     {
//         const message=`error: ${res.status}`
//         throw new Error(message)
//     }
//     return res.json()
// })
// .then((res)=>console.log(res))
// .catch((err)=>console.log(err))




// ---------using the asynce function--------



const makeRequest=async(url)=>{
   const res= await fetch(url);
   if(!res.ok){
    const message=`error:${res.status}`
    throw new Error(message);

   }
   const data=await res.json();
   return data;


};

const printFetch=()=>{
    
    makeRequest('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>console.log(res))
    .catch((res)=>console.log(res));
    
};

printFetch();