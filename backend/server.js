const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/students', studentRoutes);
app.use('/employees', teacherRoutes);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
