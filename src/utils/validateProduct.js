export const validateProduct = (product, file) => {
  const errors = {};

  if (!product.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!product.price || product.price <= 0) {
    errors.price = "El precio debe ser mayor que 0";
  }

  if (!product.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!product.category.trim()) {
    errors.category = "La categoria es obligatoria";
  }

  if (!file && !product.image) {
    errors.file = "Debes seleccionar una imagen";
  }
  return errors;

  //Si tuviera el caso de que ahora el form hace alta y edit
  //Agregamos "&& !product.image", ya que file es el archivo
  //Seleccionado por el usuario desde el explorador de archivos
  //product.image es la url cuando la imagen viene desde la ddbb

  // if (!product.file && !product.image) {
  // error.file = "Debes seleccionar una imagen";
  // }
};
