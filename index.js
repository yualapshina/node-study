const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let expenses = [];
let daily_limit = 0;

app.get('/', (req, res) => {
    res.status(200).json()
})

app.post('/expenses', (req, res) => {
    const { name, sum, date } = req.body;
    const expense = {
      name,
      sum,
      date: new Date(date).toDateString()
    };
    expenses.push(expense);
    res.status(201).json(expense);
});


app.get('/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/expenses/date', (req, res) => {
    const { date } = req.body;
    const search_date = new Date(date).toDateString();
    const search_expenses = expenses.filter((expense) => expense.date === search_date);
    res.json(search_expenses);
});

app.post('/limit', (req, res) => {
    const { limit } = req.body;
    daily_limit = limit;
    res.sendStatus(200);
});


app.get('/limit', (req, res) => {
    res.json({ limit: daily_limit });
});

app.use((req, res, next) => {
    next();
})

app.listen(3000, () => {
    console.log('Running!');
})