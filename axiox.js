console.clear();
axios
.get('https://jsonplaceholder.typicode.com/posts')

.then((res) => console.log(res))

// ----error show dakhonor jonno
.catch((err) => console.log(err))