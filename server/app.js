const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const assetRoutes = require("./routes/assetRoutes");
const authRoute = require("./routes/auth");
// const MaintenanceRoutes = require("./routes/MaintenanceRoutes");
const adminRoutes = require("./routes/AdminUsers");
const assignmentRoutes = require('./routes/assignmentRoutes');
const employee=require('./routes/employee');
const AdminUser = require('./models/AdminUser');


const Assignment = require('./models/Assignment');


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", assetRoutes);
app.use("/", authRoute);
// app.use('/api/maintenance', MaintenanceRoutes);// Ensure this route is used
app.use("/", adminRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/',employee);


app.post('/users', async (req, res) => {
    try {
      console.log(req.body)
        const newUser = new AdminUser(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



app.post('/assignments', async (req, res) => {
    const { userId, assetId, assignmentDate, status } = req.body;
    try {
        const newAssignment = new Assignment({ userId, assetId, assignmentDate, status });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});







const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://mongodb4:27017/DataStore");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
