import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../App.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function login() {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success("Welcome Marki 🔥");

      navigate("/admin");

    }

    catch {

      toast.error("Invalid login");

    }

  }

  return (

    <div className="admin-login">

      <div className="admin-login-box">

        <h1>AxM ADMIN</h1>

        <p>Authorized Access Only</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={login}>
          LOGIN
        </button>

      </div>

    </div>

  );

}