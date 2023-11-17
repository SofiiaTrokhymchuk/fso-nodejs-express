const fs = require('fs');
let persons = JSON.parse(fs.readFileSync('./persons.json', 'utf8'));

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('dist'));
morgan.token('person', (req) => {
  return JSON.stringify(req.body);
});
// app.use(morgan('tiny'));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
  )
);
app.use(cors());

function updatePersonsJson(persons) {
  fs.writeFile('./persons.json', JSON.stringify(persons), 'utf8', (error) => {
    if (error) {
      console.error(error);
    }
  });
}

app.get('/api/info', (req, res) => {
  const pageContent = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `;

  res.send(pageContent);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find((p) => p.id === Number(id));

  person ? res.json(person) : res.status(404).send('Person not found');
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  persons = persons.filter((p) => p.id !== Number(id));
  updatePersonsJson(persons);

  res.status(204).end();
});

app.post('/api/persons/', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  if (persons.find((p) => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const id = Math.round(Math.random() * 1000);
  const person = {
    id,
    name,
    number,
  };

  persons = persons.concat(person);
  updatePersonsJson(persons);

  res.json(person);
});

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`, new Date())
);
