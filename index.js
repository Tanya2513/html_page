const express = require('express');
const app = express();
const port = 3000;

const head = `<head>
<meta charset="utf-8">
    <title>Пример страницы</title>
    <style>
        p { color:  navy; }
    </style>
</head>`

const header = `<h1>Страница на HTML5</h1>`

function form (q){
    return `<form>
    <input type="text" name="q" required value="${q}">
    <input type="submit" onclick="showCat(event)">
    </form>`    
}

function sum(a, b){
    return a+b;
}

function main (req, res){
    console.log(req.query.q);
    const q = req.query.q; 
    res.send(`<!DOCTYPE html>
    <html>
     ${head}
     <body>
      ${header}
      ${form(q)}
      <div id="place">
      
      </div>
      <script>
      async function showCat(event){
        event.preventDefault();
        const response = await fetch("/cat");
        const text = await response.text()
        console.log(text);
        const elem = document.getElementById("place");
        elem.innerHTML = text;
        }

      </script>
     </body>
    </html>`);
}

function cat (req, res){

    res.send(`<div>
        <img src="https://www.film.ru/sites/default/files/styles/epsa_1024x450/public/21539801-906531.jpg">
      </div>`);
}

app.get('/', main)

app.get('/cat', cat)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
