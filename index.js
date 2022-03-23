import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// connect to database.
mongoose.connect(
  "mongodb+srv://admin-goutham:Test123@cluster0.0bbbx.mongodb.net/usersDB",
  {
    useNewUrlParser: true,
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: String,
  gender: String,
  mobile: Number,
  dob: Date,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.post("/updateProfile", (req, res) => {
  const { userEmail, age, gender, mobile, dob } = req.body;
  User.updateOne(
    { email: userEmail },
    { age: age, gender: gender, mobile: mobile, dob: dob },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Updated successfully" });
      }
    }
  );
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("front-end/build"));
}

app.listen(process.env.PORT || 9002, () => {
  console.log("BE started at port 9002");
});
