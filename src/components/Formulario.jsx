import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("el numero no es valido"),
    // notas: ''
  });

  const handleSubmit = async (valores) => {
    try {
        let repuesta;
        if(cliente.id){
            // Editando un Registro
            const url = `http://localhost:4000/clientes/${cliente.id}`;

            repuesta = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(valores),
                headers: {
                "Content-Type": "application/json",
                },
            });

        } else {
            // Nuevo Registro
            const url = "http://localhost:4000/clientes";

            repuesta = await fetch(url, {
                method: "POST",
                body: JSON.stringify(valores),
                headers: {
                "Content-Type": "application/json",
                },
            });
        }

        console.log(repuesta);
        const resultado = await repuesta.json();
        console.log(resultado);
        navigate("/clientes");

    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div
      className="bg-white mt-10 px-5 py-10 rounded-md shadow-md
            md:w-3/4 mx-auto"
    >
      <h1
        className="text-gray-600 font-bold text-xl uppercase
        text-center"
      >
        {cliente?.nombre ? "Editar Cliente" : "Agregar clientes"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (value, { resetForm }) => {
          await handleSubmit(value);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          // console.log(touched);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-none"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-none"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-none"
                  placeholder="Empresa del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-none"
                  placeholder="Telefono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas
                </label>
                <Field
                  id="notas"
                  as="textarea"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 outline-none h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Guardar Cambios" : "Agregar cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false
};

export default Formulario;
