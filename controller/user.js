import cohortfour from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// REGISTER USER
export const createStudents = async (req, res) => { 
    try {
        // read input from request body
        const { name, email, phoneNumber, password, country, state } = req.body;
        // check if email exists
        const exist = await cohortfour.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // HASH PASSWORD
        const salt =await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password,salt)
        // create new user
        const students = await cohortfour.create({
            name,
            email,
            phoneNumber,
            img,
            password:hashPassword,
            country,
            state,
        });
       return res.status(201).json({
            message: "Registration Successful",
            students,
        })
    } catch (error) {
        console.error(error)
         res.status(500).json({ message: " Server Error", error})
    }
}
//    GET ALL USERS
export const getAllStudents = async (req, res) => { 
    try {
        const students = await cohortfour.find().select("-password");
       return res.status(200).json({
            message: "Users retrieved successfully",
            students,
        })
    } catch (error) {
        console.error(error)
         res.status(500).json({ message: " Server Error", error})
    }
}

   //LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        //check if user exist
        const user = await cohortfour.findOne({email})
        if (!user) return res.status(400).json({message: "Invalid Credential"})

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect Password"})
            const token = jwt.sign(
                {id:user._id},
                process.env.SECRET_KEY,
                {expiresIn: "1d"}
            )
        res.status(200).json({message: "Login Successful", token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


//Get Single User

export const getUserById = async (req, res) => {
    const userId = req.params.id
    try {
       const user = await cohortfour.findById(userId).select('-password')
        if (!user) return res.status(404).json({message: "user not found"})
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message:error.message})
 }
}

// update user
export const updateUser = async (req, res) => {
    let userId = req.params.id;
    const { name, email, phoneNumber, country, state } = req.body
    try {
        let user = await cohortfour.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" })
            // update only updated fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.country = country || user.country;
        user.state = state || user.state;
        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
       const user = await cohortfour.findById(userId)
        if (!user) return res.status(404).json({message: "user not found"})
            await user.deleteOne()
        res.status(200).json({message: "User deleted successfully"})
}    catch (error) {
        res.status(500).json({message:error.message})
 }}

