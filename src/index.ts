import app from './app';

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(PORT, () => {
    console.log(`🚀 ByggExp backend running on port ${PORT}`);
});
