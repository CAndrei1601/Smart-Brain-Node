const Clarifai = require ('clarifai');


const app = new Clarifai.App({
    apiKey: "a7695e1e46f24463a6a97d867bfd4563",
   });

   const handleApi = (req,res) =>{
    app.models
    .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);

    })
        .catch(err =>res.status(400).json('api error'))

   }
   


const handleImage =(req,res,db)=>{
    const {id }=req.body;
    db('users').where('id' , '=' , id)    //id din baza de date sa fie egal cu id pus de noi adica din req.body =>
    .increment('entries',1)    //se foloseste pt a selecta ce vrem si sa il crestem cu o anumita valoare
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
};


module.exports={
    handleImage:handleImage,
    handleApi:handleApi


};

