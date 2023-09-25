
exports.success = (res:any,message:string)=>{
    res.status(200).json({
    status:true,
    message:message
    });
}

exports.error = (res:any,message:string)=>{
    res.status(500).json({
    status:false,
    message:message
    });
}