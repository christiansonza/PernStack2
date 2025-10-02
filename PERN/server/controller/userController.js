const User = require('../model/userModel');

// GET
const getUser = async (req, res) => {
  try {
    const users = await User.findAll({raw:true});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id,{raw:true});

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST 
const postUser = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, contact, address } = req.body;

    if (!first_name || !last_name || !contact || !address) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newUser = await User.create({
      first_name,
      middle_name,
      last_name,
      contact,
      address
    });

    res.status(201).json({
      message: 'User created!',
      data: newUser.toJSON()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT 
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, middle_name, last_name, contact, address } = req.body;

    const [updatedRows] = await User.update(
      { first_name, middle_name, last_name, contact, address },
      { where: { id } }
    );

    if (updatedRows === 0) return res.status(404).json({ message: 'User not found' });

    const updatedUser = await User.findByPk(id);
    res.status(200).json({
      message: 'User updated!',
      data: updatedUser.toJSON()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE 
const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await User.destroy({ where: { id } });

    if (deletedRows === 0) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
  getUserId,
  postUser,
  updateUser,
  destroyUser
};
