import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors({
    origin: 'http://hydrig.gsurso.ru',
    credentials: true
}));

// Настраиваем хранение
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/hardware");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now() + ext;
        cb(null, name);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: "File missing" });
    }

    const url = file.filename;

    res.json({ url });
});

// Делаем public статичным
app.get("/test", (req, res) => {
    res.send("sad");
});


app.use("/uploads", express.static("./public/hardware"));

app.listen(5011, () => {
    console.log("Server started on port 5011");
});
