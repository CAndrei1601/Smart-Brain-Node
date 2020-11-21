const { response } = require('express');
const bodyParser =require('body-parser');
const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require ('./controllers/register');
const signin=require ('./controllers/signin');
const profile=require ('./controllers/profile');
const image =require('./controllers/image');


 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'andreismecheru',
      database : 'smart-brain'
    }
  });

db.select('*').from('users');

const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{ res.send(database.users);})
app.post('/signin',(req,res) =>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) =>{register.handleRegister(req,res,db,bcrypt)})  //dependencies injection
app.get('/profile/:id', (req,res) => {profile.handeleProfile(req,res,db)})
app.put('/image', (req,res) =>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) =>{image.handleApi(req,res)})
app.listen(3000 , () => {
    console.log('runn');
});


/*
   /sign in --> Post = succes/fail  tot ce trimitem sub forma de parola trebuie pus sub POST si recomandat  protocol https
   /register --> Post = user  -- ca sa inregistram un nou utilizator
   /profile/:userID --> GET = user
   /image --> PUT --> user il punem sub forma de PUT deoarece facem update constant la imagine 
   */

