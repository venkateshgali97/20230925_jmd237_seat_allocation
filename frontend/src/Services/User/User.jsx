import Localhost from "../../Http/Http"
const UserApis = {
    addUser: async (data) => {
        try {
            const response = await Localhost.post('/user/add', data)
            return response
        } catch (err) {
            console.log(err)
        }
    },

    getAllUsers: async() =>{
        try{
            const response = await Localhost.get('user/getAll')
            return response
        }catch(err){
            console.log(err)
        }
    },

    LoginUser: async(email) =>{
        try{
            const response = await Localhost.get(`user/${email}`)
            return response
        }catch(err){
            console.log(err)
        }
    }, 

    UpdateUser: async(data) =>{
        try{
            const response = await Localhost.put('/user/update',data)
            return response
        }catch(err){
            console.log(err)
        }
    }, 
}

export default UserApis