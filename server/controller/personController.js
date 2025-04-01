const Person = require('../models/person');

// Get all persons
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new person
exports.createPerson = async (req, res) => {
  try {
    const { name, address } = req.body;

    // Create a new Person document
    const newPerson = new Person({
      name,
      address,
    });

    // Save the person to the database
    const savedPerson = await newPerson.save();

    res.status(201).json(savedPerson); // Return the created person
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update person
exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete person
exports.deletePerson = async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
