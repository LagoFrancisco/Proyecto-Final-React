import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProductInFirebase,
} from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  const { id } = useParams(); // Captura el ID de la URL si venimos del botón "Editar"
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Evalúa si es edición o alta nueva
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // MODO EDICIÓN: Si hay ID, consume Firebase para poblar el formulario con los datos actuales
  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const data = await getProductById(id);
          if (data) {
            setProduct(data); // Rellena el formulario con los datos de Firebase
          }
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      };
      fetchProductData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();

    //modificamos los estados para el "loading mientras se procesa"
    setErrors({});
    setLoading(true);

    //validar inputs
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      //subir la imagen
      const imageUrl = await uploadImage(file);

      //armar la estructura del producto
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      //alta
      const id = await createProduct(productData);
      //vaciar formulario
      setProduct({ name: "", price: "", category: "", description: "" });
      setFile(null);

      //navegar a la pagina de exito
      navigate(`/admin/products/success/${id}`, { replace: true });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };
*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Ejecuta tus validaciones (Mantenlas tal cual las tenías en tu archivo)
    const localErrors = validateProduct(product, file);

    // CORRECCIÓN: Siestoy editando y el producto ya tiene una imagen vieja,
    // Borro el error de imagen obligatoria para que me deje avanzar.
    if (isEditMode && product.image) {
      delete localErrors.image;
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setLoading(false); // Apago el estado de carga
      return; // Freno el envío si hay otros errores reales
    }

    setLoading(true);
    try {
      //Por defecto la imagen es la misma que ya tiene el prodducto (si estamos editando)
      let imageUrl = product.image || "";

      // Si el administrador seleccionó un archivo nuevo en el input, lo subimos a Storage
      if (file) {
        imageUrl = await uploadImage(file);
      }

      // Estructuramos los datos finales a guardar
      const finalProductData = {
        ...product,
        image: imageUrl,
        price: Number(product.price),
      };

      /*---------------------------------------------------------------------------- */
      /*               AQUÍ SE TOMA LA DESICIÓN: ¿EDITAR O CREAR?                    */
      /*---------------------------------------------------------------------------- */
      if (isEditMode) {
        // Opción A: Guardar los cambios sobre el producto existente
        await updateProductInFirebase(id, finalProductData);
        alert("¡Producto actualizado con éxito!");
        navigate("/admin"); // Me devuelve la lista del panel
      } else {
        // Opción B: Crear un producto desde cero (Mi lógica original)
        const newId = await createProduct(finalProductData);
        navigate(`/admin/products/success/${newId}`); // Pantalla de éxito
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
      alert("Ocurrió un error al intentar guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  // El return se queda igual a como lo tenía

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
