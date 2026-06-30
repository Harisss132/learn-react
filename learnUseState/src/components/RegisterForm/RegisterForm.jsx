import React from "react";
import { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSucces, setIsSuccess] = useState(false);
  const [akun, setAkun] = useState([]);

  function validate() {
    let newErrors = {
      name: "",
      email: "",
      password: "",
    };
    let emailPunya = "@";
    let emailJuga = ".";
    if (name.length < 3) {
      newErrors.name = "Nama tidak boleh kurang dari 3";
    }
    if (!email.includes(emailPunya) || !email.includes(emailJuga)) {
      newErrors.email = "Email harus include @ dan .";
    }
    if (password.length < 6) {
      newErrors.password = "Password tidak boleh kurang dari 6";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.values(validation).filter((error) => error !== "").length > 0) {
      return;
    } else {
      const newAkun = {
        id: +new Date(),
        name: name,
        email: email,
        password: password,
      };
      setIsSuccess(true);
      setName("");
      setPassword("");
      setEmail("");
      setAkun((prev) => [...prev, newAkun]);
    }
  }

  return (
    <div className="container">
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {errors.name.length > 0 && <p>{errors.name}</p>}
        </div>
        <div>
          <label>email: </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email.length > 0 && <p>{errors.email}</p>}
        </div>
        <div>
          <label>password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password.length > 0 && <p>{errors.password}</p>}
        </div>
        <button onClick={handleSubmit}>Submit</button>
        {isSucces === true && <p>Berhasil Daftar</p>}
      </form>
      <h2>Akun yang Berhasil Daftar</h2>
      <ul>
        {akun.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterForm;
