const express = require('express')
const router = express.Router()
const GemModel = require('../models/Gems')

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
                    faces: concept.faces,
                    color: concept.color,
                    rarity: concept.rarity,
                    shine: concept.shine,
                    url: concept.url,
                    number: concept.number,
                    stars: concept.stars,
                    body: concept.body,
                    author: concept.author
                } 
            })
        }
        res.render('gems/all-gems', {gems: ctx.gems})
    })
}) 

router.post('/gems/new-gem', async(req,res)=>{
    const {name, description, price, canPurchase, faces, color, rarity, shine,
            url, number, stars, body, author }= req.body
            console.log("body", req.body)

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
        images: [
            {
                url: req.body.url,
                number: parseInt(req.body.number)
            }
        ],
        reviews: [
            {
            stars: parseInt(req.body.star),
            body: req.body.body,
            author: req.body.author
        }
    ]
    }
    console.log("gema", gema)

    const errors = []
    
    if(!name){
        errors.push({text: "Please write a title "})
    }
    if(!description){
    errors.push({text: "Please write a description"})
    }
    if(!price){
        errors.push({text: "Please select a price "})
    }
    if(!canPurchase){
        errors.push({text: "Please select can purchase "})
    }
    if(!faces){
        errors.push({text: "Please select number of faces "})
    }
    if(!color){
        errors.push({text: "Please write a color "})
    }
    if(!rarity){
        errors.push({text: "Please select a rarity"})
    }
    if(!shine){
        errors.push({text: "Please select a shine"})
    }
    if(!url){
        errors.push({text: "Please write a url "})
    }
    if(!number){
        errors.push({text: "Please write a number "})
    }
    if(!stars){
        errors.push({text: "Please select a stars "})
    }
    if(!body){
        errors.push({text: "Please write a body "})
    }
    if(!author){
        errors.push({text: "Please write a author"})
    }
    if(errors.length > 0){
        res.render('gems/new-gem', {
            errors,
            name,
            description,
            price, 
            canPurchase, 
            faces, 
            color, 
            rarity, 
            shine,
            url, 
            number, 
            stars, 
            body, 
            author

        })
    }else{
        const newGem = new GemModel(gema)
        console.log("new gem", newGem)
        await newGem.save()
        res.redirect('/gems')
    
    }
})

router.get('/gems/edit/:id', async(req, res)=>{
    const gemDB = await GemModel.findById(req.params.id)
    const Gems = {
        _id: gemDB._id,
        name: gemDB.name,
        description: gemDB.description,
        price: gemDB.price,
        canPurchase: gemDB.price, 
        faces: gemDB.faces, 
        color: gemDB.color, 
        rarity: gemDB.rarity, 
        shine: gemDB.shine,
        url: gemDB.url, 
        number: gemDB.number, 
        stars: gemDB.stars, 
        body: gemDB.body, 
        author: gemDB.author,
        creationDate: gemDB.creationDate
    }
    res.render('gems/edit-gem', {Gems})
})
router.put('/gems/edit-gem/:id',async(req, res)=>{
    const {name, description, price, canPurchase, faces, color, rarity, shine,
        url, number, stars, body, author} = req.body
    await GemModel.findByIdAndUpdate(req.params.id, { name, description, price, canPurchase, faces, color, rarity, shine,
        url, number, stars, body, author})
    res.redirect('/gems')
})
router.delete('/gems/delete/:id', async(req, res)=>{
    await GemModel.findByIdAndDelete(req.params.id)
    res.redirect('/gems')
})
module.exports = router