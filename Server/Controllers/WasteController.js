const WasteModel = require("../Models/WasteModel");

const addwaste = async(req,res)=>{
    const {waste_type,waste_quantity,waste_location,waste_date,waste_time} = req.body;
    try{
        let waste = new WasteModel(
            {
                waste_type,
                waste_quantity,
                waste_location,
                waste_date,
                waste_time,
            }
        )
        await waste.save();
        res.status(200).json({
            status:"success",
            message:"Waste added successfully",
            waste
        })
    }
    catch(err){
        res.status(500).json({
            status:"failure",
            message:"Server Error"
        })
    }
}

const getwaste = async(req,res)=>{
    try{
        const waste = await WasteModel.find();
        res.status(200).json({
            status:"success",
            message:"Waste found",
            waste
        })
    }
    catch(err){
        res.status(500).json({
            status:"failure",
            message:"Server Error"
        })
    }
}

const updatewaste = async(req,res)=>{
    const {id} = req.params;
    const {waste_type,waste_quantity,waste_location,waste_date,waste_time} = req.body;
    try{
        let waste = await WasteModel.findOne({_id:id});
        waste.waste_type = waste_type;
        waste.waste_quantity = waste_quantity;
        waste.waste_location = waste_location;
        waste.waste_date = waste_date;
        waste.waste_time = waste_time;
        await waste.save();
        res.status(200).json({
            status:"success",
            message:"Waste updated successfully",
            waste
        })
    }
    catch(err){
        res.status(500).json({
            status:"failure",
            message:"Server Error"
        })
    }
}

const deletewaste = async(req,res)=>{
    try{
        const {id} = req.params;
        await WasteModel.deleteOne({_id:id});
        res.status(200).json({
            status:"success",
            message:"Waste deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            status:"failure",
            message:"Server Error"
        })
    }
}

module.exports = {addwaste,getwaste,updatewaste,deletewaste};