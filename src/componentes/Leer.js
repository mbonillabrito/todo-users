import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Leer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:3000/users/${id}`);
        setData(respuesta.data);
      } catch (error) {
        console.error("Error no trae la data:", error);
        setError("Error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>No se encontraron datos del usuario.</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-8">Detalles del Usuario</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Nombre:</strong> {data.name}
        </p>
        <p>
          <strong>Edad:</strong> {data.age}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {data.phone_number}
        </p>
        <p>
          <strong>Género:</strong> {data.gender}
        </p>
        <p>
          <strong>Ciudad:</strong> {data.city}
        </p>
        <div className=" mt-4 ">
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 "
          >
            Back
          </Link>
          <Link
            to={`/actualizar/${id} `}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded"
          >
            Actualizar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leer;
