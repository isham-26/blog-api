import route from "express";
import Category from "../modules/Category.js";
const categoryRouter = route.Router();

categoryRouter.post("/",async (req,res)=>{
    const newCat=new Category(req.body);
     try{
        const saveCat=await newCat.save()
        res.status(200).json(saveCat)
     }catch(err){
        res.status(500).json(err)
     }
})
categoryRouter.get("/",async (req,res)=>{
    
     try{
        const Cats=await Category.find({})
        res.status(200).json(Cats)
     }catch(err){
        res.status(500).json(err)
     }
})

export default categoryRouter