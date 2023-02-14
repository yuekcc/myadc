async function start({ req, res }) {
  const text = await fetch(`https://www.baidu.com`).then(res => res.text());
  res.set('Content-Type', 'text/plain');
  res.send(text);
}

start(event);
