const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
const PORT = 3000;
const globalErrorHandler = require('./middleware/errorHandler');
require("dotenv").config();

app.use(express.json());
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');
const noteRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/notes', noteRoutes);
app.use('/api/auth', authRoutes);

// Global error handler
app.use(globalErrorHandler.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

