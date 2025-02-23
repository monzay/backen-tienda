 export const resClient = (res,status,mensaje)=>{
  return  res.status(200).json({
    status,
    mensaje,
  });
}
