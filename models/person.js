const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => console.log('DB is working'))
  .catch((e) => console.error('DB is NOT working', e.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Names is required'],
    minLength: [3, 'Name must be at least 3 characters long'],
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}-[0-9]{6,}$/.test(v);
      },
      message:
        'Number should contain 2 or 3 digits before "-" and at least 6 digits after',
    },
  },
});

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
