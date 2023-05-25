import React, { useRef, ChangeEvent } from "react";

const ImageUploader = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>("" as any | null);

  const handleFileUpload = () => {
    if (
      inputFileRef.current &&
      inputFileRef.current.files &&
      inputFileRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", inputFileRef.current.files[0]);
      formData.append("name", inputTextRef.current.value);

      fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      })
        // .then((res) => res.json())
        // .then((data) => {
        //   console.log("Imagen subida:", data);
        //   // Lógica adicional, como mostrar un mensaje de éxito, actualizar la vista, etc.
        // })
        // .catch((error) => {
        //   console.error("Error al subir la imagen:", error);
        //   // Lógica adicional, como mostrar un mensaje de error, manejar errores, etc.
        // });
    // } else {
    //   console.error("No se ha seleccionado ningún archivo");
      // Lógica adicional, como mostrar un mensaje de error o hacer algo en caso de que no se seleccione ningún archivo.
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  return (
    <div>
      <input type="file" ref={inputFileRef} onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Subir imagen</button>
      <input type="text" ref={inputTextRef} onChange={handleInputChange}/>
    </div>
  );
};

export default ImageUploader;
