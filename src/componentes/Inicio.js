import axios from "axios";
import React, { useEffect, useState } from "react";

const Inicio = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/users");
        setdata(respuesta.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col bg-gradient-to-r from-blue-800 to-blue-400 w-screen h-screen  ">
      <h1 className=" text-white text-center mt-[170px] font-extrabold  text-3xl border-black-500  ">
        Lista de Usuarios
      </h1>
      <table class=" table-fixed bg-white mx-auto my-[40px] opacity-2 shadow-white-600 drop-shadow-2xl">
        <thead className="  mx-auto p-2 text-center ">
          <tr className=" m-[330px] mx-auto ">
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Genero</th>
            <th>Ciudad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>

          {
            data.map( (d,i) => (
              <tr key={i}> 
              <td> {d.id} </td>
              <td> {d.name} </td>
              <td> {d.age} </td>
              <td> {d.email} </td>
              <td> {d.phone_number} </td>
              <td> {d.gender} </td>
              <td> {d.city} </td>
              <td> 
              <button className=" bg-blue-600 rounded-b-md p-1 m-2 "  > Editar </button>
              <button className=" bg-red-600 rounded-b-md p-1 m-2  "> Borrar </button>
              </td>
              
              </tr>
            )

            )
          }


        </tbody>
      </table>
    </div>
  );
};

export default Inicio;
