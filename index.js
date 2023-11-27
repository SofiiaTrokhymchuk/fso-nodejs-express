require('dotenv').config();

const Person = require('./models/person');

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

app.get('/api/info', (req, res, next) => {
  Person.countDocuments({})
    .then((data) => {
      const pageContent = `
    <p>Phonebook has info for ${data} people</p>
    <p>${new Date()}</p>
    `;
      res.send(pageContent);
    })
    .catch((err) => next(err));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        const error = new Error();
        error.name = 'NotFoundError';
        throw error;
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        const error = new Error();
        error.name = 'NotFoundError';
        throw error;
      }
    })
    .catch((err) => next(err));
});

app.post('/api/persons/', (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((data) => res.json(data))
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const { id } = req.params;
  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        const error = new Error();
        error.name = 'NotFoundError';
        throw error;
      }
    })
    .catch((err) => next(err));
});

app.use((req, res) => res.status(404).json({ error: 'Unknown path' }));

app.use((err, req, res) => {
  console.error(err);
  const errors = {
    CastError: { status: 400, message: 'Invalid object ID' },
    ValidationError: { status: 403, message: err.message },
    NotFoundError: { status: 404, message: 'Person not found' },
  };

  res
    .status(errors[err.name]?.status || 500)
    .json({ error: errors[err.name]?.message || err.message });
});

app.listen(PORT, () =>
  console.info(`Server started on port ${PORT}`, new Date())
);
