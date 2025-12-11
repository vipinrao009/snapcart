import mongoose, { Schema } from "mongoose"

interface IUser {
    _id?: mongoose.Types.ObjectId
    name:string,
    email:string,
    password:string,
    mobile?:string,
    role: "user" | "deliveryBoy"  | "admin"
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    mobile: {
        type:String,
    },
    role: {
        type:String,
        enum:["user", "deliveryBoy", "admin"],
        default: "user"
    }
},{timestamps:true})

// userSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10)
//     }

//     next()
// })

const User =mongoose.models.User || mongoose.model("User", userSchema)