import Localhost from "../../Http/Http"
const AdminModuleApi = {
 addRoom : async(data) =>{
    try{
        const response = await Localhost.post('/room/add', data)
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 },
 getAllRooms: async() =>{
    try{
        const response = await Localhost.get('/room/getAll')
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 },

 updateUserDetailsAndRoomDetails : async(data) =>{
    try{
        const response = await Localhost.put('/room/update',data)
        return response
    }catch(err){
        console.log(err, "This is err")
    }
 }
}

export default AdminModuleApi