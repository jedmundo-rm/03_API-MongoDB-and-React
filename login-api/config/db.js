const mongoose = require('mongoose')

const {
    MONGO_ATLAS_USER,
    MONGO_ATLAS_PASSWORD,
    MONGO_ATLAS_HOST,
    MONGO_ATLAS_NAME,
} = process.env


const url = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASSWORD}@${MONGO_ATLAS_HOST}/${MONGO_ATLAS_NAME}`

//const url = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_HOST}/${process.env.MONGO_ATLAS_NAME}`

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.error(`Error MongoDB: ${error.messagee}`);
        process.exit()
    }
}


module.exports = connectDB