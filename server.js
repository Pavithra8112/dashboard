const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Function to initialize Sequelize
const initializeSequelize = (myappdb, employees) => {
  return new Sequelize(myappdb, 'root', 'system', {
    host: 'localhost',
    dialect: 'mysql',
  });
};

// Function to define Employee model dynamically
const defineEmployeeModel = (sequelize, tableName) => {
  return sequelize.define('Employee', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Additional fields for employee details
    address: {
      type: DataTypes.STRING,
    },
    contactNumber: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: tableName, // Specify the table name
  });
};

// Initialize Sequelize with "myapp" database
const sequelize = initializeSequelize('myappdb', 'Employees');

// Define the Employee model for the "Employees" table
const Employee = defineEmployeeModel(sequelize, 'Employees');

// Sync the models with the database
sequelize.sync();

// Register route
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      username,
      password: hashedPassword,
      role,
    });

    res.json({ success: true, employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ where: { username } });

    if (employee) {
      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (passwordMatch) {
        const token = jwt.sign({ username, role: employee.role }, 'system', { expiresIn: '1h' });

        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update employee details route
app.put('/updateEmployee/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { address, contactNumber, image } = req.body;

  try {
    const updatedEmployee = await Employee.update(
      { address, contactNumber, image },
      { where: { id: employeeId } }
    );

    res.json({ success: true, message: 'Employee details updated successfully', updatedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
