import app from './app.js';
import sequelize from './config/database.js';


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


sequelize.authenticate()
  .then(() => console.log("✅ DB CONNECTED"))
  .catch(err => console.error("❌ DB ERROR:", err));