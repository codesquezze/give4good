const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sahil:sahil@cluster0.mp8kq.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";
const connectTomongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to mongo')
        const User = mongoose.connection.db.collection("user_datas")
        const fetched_data = mongoose.connection.db.collection("product");
        const data = await fetched_data.find({}).toArray();
        const userData = await User.find({}).toArray();
        global.shop_items = data;
        global.userDetails = userData;
        // console.log(userData)
    } catch (error) {
        console.error(error);
    }
}
module.exports = connectTomongo;