const { response } = require('express');
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

app.get('/', (request, response) => {
    response.send('<h1> Hello World </h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const per = persons.find(person => person.id === id)

    if (per)
        response.json(per)
    else
        response.status(404).end();
})

app.get('/api/info', (request, response) => {
    const personList = persons.length;
    const date = new Date();
    response.send(`<p> Phonebook has info for ${personList} people</p> <br> ${date}`);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => {
        if (person.id !== id) {
            //console.log("id did not match", personid)
            return true;
        }
        return false;

    })
    console.log(persons);
    response.status(204).end();
})

function generateId() {
    const BIGNUM = 12345;
    return Math.floor(Math.random() * BIGNUM);
}

app.post('/api/persons', (request, response) => {

    const person = request.body;

    if (person.name === undefined || person.name === "")
        response.status(400).json({
            error: 'Name is missing'
        });

    if (person.number === undefined || person.number === "")
        response.status(400).json({
            error: 'Number is missing'
        });

     let alreadyPresent = persons.find(per => person.name === per.name);
     
     if(alreadyPresent)
        response.status(400).json({
           error: 'Name is already present'
       });

    if (person.name === undefined || person.name === "")
        response.status(400).json({
            error: 'Name is missing'
        });

    person.id = generateId();
    persons.concat(person);
    //  console.log(person);

    response.json(person);

})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})