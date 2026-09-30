const express = require('express');
const  app = express();
app.use(express.json());

let users = [ 
    { id: 1, name: 'cheri', email: 'LHk7o@example.com'},
    { id: 2, name: 'joe', email: 'LHk7o@example.com' },
    { id: 3, name: 'daniel', email: 'LHk7o@example.com' },
];

//Endpoint get mnegambil data
app.get("/api/users",(req,res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if(user){
        return res.status(404).send("User tidak ada");
    }
    res.json(user);
});
//endpoint post menambahkan data
app.post("/api/users", (req, res) => {
    const {name, email} = req.body;
    const newUser = {
        id: users.length + 1,
        name, 
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
//endpoint delete
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);

    res.sendStatus(204).send("User Berhasil dihapus");
});
///endpooint Update
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const {name, email} = req.body;
    const user = users.find((u) => u.id === userId);
    if(!user){
        return res.status(404).send("User tidak ada");
    }
    user.name = name;
    user.email = email;
    res.json(user);
});

//jalankan server di post 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server berjalan di http://localhost:${PORT}');
});