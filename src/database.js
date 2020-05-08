const mongoose =require('mongoose')

const url = 'mongodb://localhost/gems-db-app'
mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
.catch(err => console.error(err))