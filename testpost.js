data = {
  title: "test",
  url: "reddit.com",
  tags: ['website', 'entertainment']
}

fetch('/links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(res => console.log(res));
