const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: 'Arto Hellas1',
        number: "041-123456"
    },
    {
        id: 2,
        name: 'Arto Hellas2',
        number: "042-123456"
    },
    {
        id: 3,
        name: 'Arto Hellas3',
        number: "043-123456"
    },
    {
        id: 4,
        name: 'Arto Hellas4',
        number: "044-123456"
    }
];

app.get('/',(request,response) => {
    response.send('<h1> Hello World </h1>');
})

app.get('/api/persons',(request,response) => {
    response.json(persons);
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id);
    const per = persons.find( person => person.id === id)

    if(per)
        response.json(per)
    else
        response.status(404).end();
})

app.get('/api/info',(request,response) => {
    const personList = persons.length;
    const date = new Date();
    response.send(`<p> Phonebook has info for ${personList} people</p> <br> ${date}`);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})