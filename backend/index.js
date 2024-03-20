const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/excel_upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(express.json())

// Create Schema and Model
const excelSchema = new mongoose.Schema({}, { strict: false });
const Excel = mongoose.model('Excel', excelSchema);

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    Excel.insertMany(excelData)
        .then(() => {
            res.json({ message: 'Upload successful' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
