import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { useState } from "react";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    pasword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.pasword);
      navigate("/admin", { replace: true });
    } catch (error) {}
    console.error(error);
    alert("Error al iniciar sesión");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Pasword</label>
        <input
          type="pasword"
          name="pasword"
          placeholder="Contraseña"
          value={formData.pasword}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn bg-primary" type="submit">
        Ingresar
      </button>
    </form>
  );
};
