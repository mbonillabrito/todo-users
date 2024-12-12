import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Crear = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({});
  const [nextId, setNextId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos iniciales para determinar el próximo ID
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;
        const maxId = users.reduce(
          (max, user) => Math.max(max, parseInt(user.id, 10)),
          0
        );
        setNextId((maxId + 1).toString());
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const newData = { ...data, id: nextId, age: parseInt(data.age, 10) };
    setFormData(newData);
    try {
      const response = await axios.post("http://localhost:3000/users", newData);
      console.log("Usuario agregado:", response.data);
      navigate("/"); // Redirigir a la ruta específica después de agregar el usuario
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-8">Agregar Usuario</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nombre</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.name && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Edad</label>
          <input
            {...register("age", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.age && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            {...register("email", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.email && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Teléfono</label>
          <input
            {...register("phone_number", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.phone_number && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Género</label>
          <select
            {...register("gender", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Selecciona una opción</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ciudad</label>
          <input
            {...register("city", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.city && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
        <div className="flex justify-between">
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </Link>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Crear;
