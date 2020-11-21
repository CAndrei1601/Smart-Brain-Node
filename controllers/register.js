const handleRegister = (req,res,db,bcrypt) =>{           //creem un nou utilizator
    const {name,email,password}=req.body   //utilizam destructuring pentru a lua din ce introducem noi (req.body e functia) de nume parola si email
    const hash =bcrypt.hashSync(password);
    if(!email || !name || !password){        //validam daca datele sunt introduse corect !!
        return res.status(400).json('inncorect form')
    }
    db.transaction(trx => {                 //facem o tranzactie pentru a avea date din user si in tabelul login
        trx.insert({
                    hash:hash,    
                    email:email

        })
        .into('login')
        .returning('email')     //emailul e cheia intre cele doua tabele
        .then(loginEmail =>{
           return trx('users')
            .returning('*')               //ne reutrneaza toate datele utilizatorului
            .insert({                   //introuce datele
                email:loginEmail[0],
                name:name,
                joined: new Date() 
            }).then(user => {          //promises atunci returnam utilizatoorul
                    res.json(user[0]);
            })
    
        })
        .then(trx.commit)    //dupa ce facem toate trebuie adaugata aceasta comanda
        .catch(trx.rollback)
    })
    
    .catch(err => res.status(400).json('unable to register'))
}
module.exports = {
    handleRegister:handleRegister

};