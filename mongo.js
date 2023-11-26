const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.error('Provide a password for connection to MongoDB');
  process.exit(1);
}

if (process.argv.length >= 4 && process.argv.length < 5) {
  console.error('Enter both name and number');
  process.exit(1);
}

const password = process.argv[2];
const uri = `mongodb+srv://sonia:${password}@cluster0.0zbcsqf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({})
    .then((res) => {
      console.log('Phonebook:');
      res.forEach((p) => console.log(p.name, p.number));
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((res) => {
    console.log('Person is saved', res);
    mongoose.connection.close();
    process.exit(0);
  });
}
