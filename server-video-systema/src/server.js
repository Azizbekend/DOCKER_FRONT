const app = require('./app');

const PORT = 5012;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});