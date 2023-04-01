import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
// import env from "env";

// ek to query parameter hai aur dusra hai body parameter and iske alawa bhi ham ek aur tareeka use kar sakte hai and like /user/:id and isme id is a path parameter aur "user/" iske baad jo bhi likha hoa usse vo params ke andar aata hai (note id to bass ek example hai but agar hum koi aur bhi likhenge to vo bhi params ke andar aayega) fir jisko ham req.params se access karenge vo uska value aayega .

export const getAllUsers = async (req, res) => {
  // //   const { okko } = req.params; // either use this or use req.params where you would have url somewhat like /user/:id and then you can access the id using req.params.id and then you can use it to find the user in the database and then send it back to the user as a response
  // const users = await User.find(); // storing all users data in user constant from the database.
  // // console.log(req.params.okko)
  // res.json({
  //   success: true,
  //   users, // sending the user data to the user as a response in json format.
  // });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  // console.log(user);
  
  if (user) return next(new ErrorHandler("User already exists", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "User Created Successfully", 201);
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return next(new ErrorHandler("Invalid Email or Password", 400));
  
  sendCookie(user, res, `Welcome Back ${user.name} `, 200);
  } catch (error) {
    next(error)
  }
};

export const getMyProfile = (req, res) => {
  try {
    // const id = req.params;

  const { token } = req.cookies;

  res.json({
    success: true,
    user: req.user,
  });
  } catch (error) {
    next(error)
  }
};

export const logoutUser = async (req, res) => {
try {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development"? "lax": "none",
    secure: process.env.NODE_ENV === "Development"? false: true, 
  }).json({

    success: true,
    message: "Logged Out Successfully"
  });
} catch (error) {
  next(error)
}
}

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     message: "Updated the user",
//   });
// };

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);

//   if(!user) {
//     return res.json({
//       success: false,
//       message: "User not found",
//     })
//   }

//   await User.deleteOne({name: `${user.name}`});

//   res.json({
//     success: true,
//     message: `Deleted the user ${user.name}`,
//   });
// ;
