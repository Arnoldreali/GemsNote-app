const express = require('express')
const router = express.Router()
const GemModel = require('../models/Gem')

router.get('/gems/add', (req, res)=>{
    res.render('gems/new-gem')
})

router.get('/gems', async(req, res)=>{ 
    await GemModel.find({}).sort({creationDate: 'desc'}).then(concepts =>{
        const ctx = {
            gems: concepts.map(concept=>{
                return {
                    _id: concept._id,
                    name: concept.name,
                    description: concept.description,
                    price: concept.price,
                    canPurchase: concept.canPurchase,
                    faces: concept.specs.faces,
                    color: concept.specs.color,
                    rarity: concept.specs.rarity,
                    shine: concept.specs.shine,
                    url: concept.images[0].url,
                    number: concept.images[0].number,
                    stars: concept.reviews[0].stars,
                    body: concept.reviews[0].body,
                    author: concept.reviews[0].author
                } 
            })
        }
        console.log("ctx", ctx)
        res.render('gems/all-gems', {gems: ctx.gems})
    })
}) 

router.post('/gems/new-gem', async(req,res)=>{
  

            const gema = {
                name: req.body.name,
                description: req.body.description,
                price: parseInt(req.body.price),
                canPurchase: req.body.canPurchase = "on" ? true : false,
                specs: {
                    faces: parseInt(req.body.faces),
                    color:  req.body.color,
                    rarity: parseInt(req.body.rarity),
                    shine: parseInt(req.body.shine),
                } , 
                images: {
                        url: req.body.url,
                        number: parseInt(req.body.number),
                    },
                reviews:{
                    stars: parseInt(req.body.star),
                    body: req.body.body,
                    author: req.body.author,
                }
            }

    const errors = []
    
    if(!gema.name){
        errors.push({text: "Please write a title "})
    }
    if(!gema.description){
    errors.push({text: "Please write a description"})
    }
    if(!gema.price){
        errors.push({text: "Please select a price "})
    }
    if(!gema.canPurchase){
        errors.push({text: "Please select can purchase "})
    }
    if(!gema.specs.faces){
        errors.push({text: "Please select number of faces "})
    }
    if(!gema.specs.color){
        errors.push({text: "Please write a color "})
    }
    if(!gema.specs.rarity){
        errors.push({text: "Please select a rarity"})
    }
    if(!gema.specs.shine){
        errors.push({text: "Please select a shine"})
    }
    if(!gema.images.url){
        errors.push({text: "Please write a url "})
    }
    if(!gema.images.number){
        errors.push({text: "Please write a number "})
    }
    if(!gema.reviews.stars){
        errors.push({text: "Please select a stars "})
    }
    if(!gema.reviews.body){
        errors.push({text: "Please write a body "})
    }
    if(!gema.reviews.author){
        errors.push({text: "Please write a author"})
    }
   if(errors.length > 0){
        res.render('gems/new-gem', { errors, name, description, price, canPurchase, faces, 
            color, rarity, shine, url, number, stars, body, author}
            )
    }else{
        const newGem = new GemModel(gema)
        console.log("new gem ", newGem )
        await newGem.save()
        res.redirect('/gems')
    
     }
})

router.get('/gems/edit/:id', async(req, res)=>{
    const gemDB = await GemModel.findById(req.params.id)
    console.log("gem DB",gemDB)
    const Gem = {
        _id: gemDB._id,
        name: gemDB.name,
        description: gemDB.description,
        price: gemDB.price,
        canPurchase: gemDB.canPurchase, 
        faces: gemDB.specs.faces, 
        color: gemDB.specs.color, 
        rarity: gemDB.specs.rarity, 
        shine: gemDB.specs.shine,
        url: gemDB.images[0].url, 
        number: gemDB.images[0].number, 
        stars: gemDB.reviews[0].stars, 
        body: gemDB.reviews[0].body, 
        author: gemDB.reviews[0].author,
        creationDate: gemDB.creationDate
    }
    res.render('gems/edit-gem', {Gem})
})

router.put('/gems/edit-gem/:id',async(req, res)=>{
     const gemas = {
        name,
        description,
        price,
        canPurchase,
        specs: {
            faces: specs.faces,
            color: specs.color,
            rarity: specs.rarity,
            shine: specs.shine,
        } , 
        images: {
                url: images.url,
                number: images.number
            },
        reviews:{
            stars: reviews.stars,
            body: reviews.body,
            author: reviews.author
        }
    } = req.body
    await GemModel.findByIdAndUpdate(req.params.id, gemas)
    res.redirect('/gems')
})

router.delete('/gems/delete/:id', async(req, res)=>{
    await GemModel.findByIdAndDelete(req.params.id)
    res.redirect('/gems')
})
module.exports = router