console.clear();






//---xml er request make kora 

const makeRequest=(method,url,data)=>{
    const xhr = new XMLHttpRequest();
    
    xhr.open(method,url);
    
    xhr.setRequestHeader('content-type','application/json')
    xhr.onload=() =>{
     let data=xhr.response;

     console.log(JSON.parse(data));

    }

    xhr.onerror=()=>{
        console.log("error is here");
    }
    xhr.send(JSON.stringify(data));
}

const getdata=()=>
{
    makeRequest('Get','https://jsonplaceholder.typicode.com/posts');
    
}

const sendData=()=>
{
    makeRequest('post','https://jsonplaceholder.typicode.com/posts',{
        title: 'foo',
        body: 'bar',
        userId: 1,
    });
    
}


const updateData=()=>
{
    makeRequest('put','https://jsonplaceholder.typicode.com/posts/1',{
    id: 1,
    title: 'ruhul',
    body: 'bar',
    userId: 1,
    });
    
}

const updateSingleData=()=>
{
    makeRequest('PATCH','https://jsonplaceholder.typicode.com/posts/1',{
    title: 'this is ',
    });
    
}

getdata();
sendData();
updateData();
updateSingleData();