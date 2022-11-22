const express=require('express');
const apiRoutes=require('./routes/apiRoutes');
const userRoutes=require('./routes/userRoutes');

const app=express();
const PORT=process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api',apiRoutes);
app.use('/',userRoutes);

app.listen(PORT, ()=>console.log(`Started listening on PORT:${PORT}`));