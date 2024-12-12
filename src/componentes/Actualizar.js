import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Actualizar = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:3000/users/${id}`);
        const userData = respuesta.data;
        setValue("id", userData.id); // Set the ID value
        setValue("name", userData.name);
        setValue("age", userData.age);
        setValue("email", userData.email);
        setValue("phone_number", userData.phone_number);
        setValue("gender", userData.gender);
        setValue("city", userData.city);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setError("Error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, data);
      console.log("Usuario actualizado:", data);
      navigate("/"); // Redirigir a la ruta específica después de actualizar el usuario
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setError("Error al actualizar usuario.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-8">Actualizar Usuario</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">ID</label>
          <input
            {...register("id", { required: true })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            readOnly
          />
          {errors.id && (
            <span className="text-red-500">Este campo es obligatorio</span>
          )}
        </div>
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
            {...register("age", {
              required: true,
              valueAsNumber: true,
              min: 0,
            })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            type="number"
          />
          {errors.age && (
            <span className="text-red-500">
              Por favor, ingresa una edad válida
            </span>
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

export default Actualizar;
