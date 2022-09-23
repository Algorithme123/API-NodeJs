const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


// Database connection

const db = mysql.createConnection({
    host: "localhost",
    user : 'root',
    password: 'Admin2020',
    database:"angularNode",
    port: 3308
});

db.connect(err=>{
    if(err){
        console.log(err,'erreur !!! Erreur lors de la connexion a la base de donnees');
    }
    console.log('Connection Reussi ...')
})


// recupperation de tous les donnees 

app.get('/personnes',(req,res)=>{
    // console.log('get personnes');
    let qrGetAll=`select * from personne`;

    db.query(qrGetAll,(err,result)=>{

        if(err){
            console.log(err,"erreur");

        }
        if(result.length>0){

            res.send({
                message:' Tous les donnes des utilisateur',
                data:result
            })

        }

    })
})

/********************************** 
 
Recuperation d'une seulle donnees

**********************************/

app.get('/personne/:id',(req,res)=>{
    

    let recuperationId = req.params.id;
    
    let getId=parseInt(recuperationId)

    let qrGetPersonneById= `select * from personne where id = ${getId}`;

    db.query(qrGetPersonneById,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send({
                message:" Recuperation d'un seul Personne",
                data: result
            });
        }
        else{
            res.send({
                message: "Personne not found",
            })
        }
    })
    
     

})

/********************************** 
 
 Ajout d'un Personne

**********************************/

app.post('/personne/Ajout',(req,res)=>{
    
    let nom =req.body.nom;
    let prenom = req.body.prenom;
    let age=req.body.age;
    let email=req.body.email;

    let qrAjouterPersonne =`insert into personne(nom,prenom,age,email)
        values ('${nom}','${prenom}',${age},'${email}'
    )`;

    db.query(qrAjouterPersonne,(err,result)=>{

        if(err){console.log(err);}
        // if(result.length>0){
        //     res.send({
        //         message: 'Donnees inserer avec success'
        //     });
        // }else{
        //     res.send({
        //         message : " Erreur Donnees non inserer"
        //     })
        // }

        console.log(result,'result')
        res.send({
            message :"Donnees inserer avec success"
        })
    });
})



/********************************** 
 
        Methode PUT  Modification

 **********************************/

app.put('/personne/modifier/:id',(req,res)=>{

    console.log(req.body,'Mis a Jour ');
    
    
    let recuperationId = req.params.id;
    
    let getId=parseInt(recuperationId)


    let nom =req.body.nom;
    let prenom = req.body.prenom;
    let age=req.body.age;
    let email=req.body.email;

    let qrUpdate = `update personne set nom = '${nom}', prenom = '${prenom}', age = '${age}', email = '${email}' 
                        where id = ${getId} `;

    db.query(qrUpdate,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Mis a jour'
        })
    })

})



/********************************** 
 * 
        Suppression  DELECT  Modification
        
 **********************************/


app.delete('/personne/supprimer/:id', (req,res)=>{

    recuperationId = req.params.id;
    let getId=parseInt(recuperationId);

    let qrSuppression = `delete from personne where id = '${getId}' `

    db.query(qrSuppression,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message : " Donnees Supprimer avec success"
        })
    });


});






app.listen(3000,()=>{
    console.log("Le serveur est allumer")
}) 
