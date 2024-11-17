import 'dotenv/config'; // Automatically loads environment variables from .env file
import app from './app.js';
import connectDB from './db/index.js';

// Connect to the database
connectDB()
  .then(() => {
    // Use the PORT environment variable, default to 8001 if not set (for local dev)
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MONGODB connection error:', error);
    process.exit(1);
  });
