import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/users");
        setData(respuesta.data);
      } catch (error) {
        console.error("Error no trae la data:", error);
      }
    };
    fetchData();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/users/${id}`);
  //     const updatedData = data.filter((user) => user.id !== id);
  //     const reorderedData = updatedData.map((user, index) => ({
  //       ...user,
  //       id: (index + 1).toString(),
  //     }));
  //     setData(reorderedData); // Actualizar los IDs en el servidor
  //     for (const user of reorderedData) {
  //       await axios.put(`http://localhost:3000/users/${user.id}`, user);
  //     }
  //   } catch (error) {
  //     console.error("Error al borrar el usuario:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      // Paso 1: Eliminar el usuario del servidor JSON
      await axios.delete(`http://localhost:3000/users/${id}`);

      // Paso 2: Filtrar los datos para eliminar el usuario y reordenar los registros
      const updatedData = data.filter((user) => user.id !== id);
      const reorderedData = updatedData
        .sort((a, b) => parseInt(a.id) - parseInt(b.id)) // Ordenar numéricamente
        .map((user, index) => ({
          ...user,
          id: (index + 1).toString(), // Nuevos IDs consecutivos
        }));

      // Paso 3: Actualizar el estado local
      setData(reorderedData);

      // Paso 4: Actualizar el archivo JSON con los datos reordenados
      for (const user of reorderedData) {
        try {
          const response = await axios.put(
            `http://localhost:3000/users/${user.id}`,
            user
          );
          console.log(`Usuario con ID ${user.id} actualizado:`, response.data); // Verificar la respuesta
        } catch (error) {
          console.error(
            `Error al actualizar el usuario con ID ${user.id}:`,
            error
          );
        }
      }

      // Verificar si los datos se han actualizado en el servidor
      const response = await axios.get("http://localhost:3000/users");
      console.log("Datos después de la actualización:", response.data); // Verificar la respuesta completa
    } catch (error) {
      console.error("Error al borrar el usuario y reordenar los IDs:", error);
    }
  };

  return (
    <div className="box-border bg-gradient-to-r from-blue-800 to-blue-400 min-h-screen">
      <div className="flex flex-col h-svh gap-7 justify-center items-center">
        <h1 className="bg-clip-text text-transparent text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500">
          Lista de Usuarios
        </h1>

        <div className="overflow-x-auto">
          <div className="flex justify-start w-full px-8 my-3 ">
            <Link
              to="/crear"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              ADD +
            </Link>
          </div>
          <table className=" table-auto min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">Nombre</th>
                <th className="py-3 px-6 text-center">Edad</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">Teléfono</th>
                <th className="py-3 px-6 text-center">Género</th>
                <th className="py-3 px-6 text-center">Ciudad</th>
                <th className="py-3 px-6 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr
                  key={i}
                  className="bg-white hover:bg-gray-200 transition duration-300"
                >
                  <td className="py-3 px-6 text-center">{d.id}</td>
                  <td className="py-3 px-6 text-center">{d.name}</td>
                  <td className="py-3 px-6 text-center">{d.age}</td>
                  <td className="py-3 px-6 text-center">{d.email}</td>
                  <td className="py-3 px-6 text-center">{d.phone_number}</td>
                  <td className="py-3 px-6 text-center">{d.gender}</td>
                  <td className="py-3 px-6 text-center">{d.city}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/leer/${d.id} `}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded"
                    >
                      Leer
                    </Link>
                    <Link
                      to={`/actualizar/${d.id} `}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-1  rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1  rounded"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
