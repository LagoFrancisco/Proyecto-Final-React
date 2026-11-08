import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

//Todas las funciones van a utilizar esta colección.
//La hacemos global y que todas la usen en vez de definirla varias veces
//Creamos la referencia a la collección: en mi caso se llama "products"
const productsRef = collection(db, "products");

/*----------------------------------------------------------------------*/
/*                              TRAER PRODUCTOS                         */
/*----------------------------------------------------------------------*/
export const getProducts = async () => {
  try {
    //Esto no nos da el objeto de producto directo,
    //sino un tipo especial de firestore. Sería como una "foto" de lo que hay
    //al momento, más otras cosas. Es un "QuerySnapshot"
    const snapshot = await getDocs(productsRef);

    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return productsFormat;
  } catch (error) {
    console.log("Error al traer productos", error);
    throw error;
  }
};

/*----------------------------------------------------------------------*/
/*                          TRAER PRODUCTOS POR ID                      */
/*----------------------------------------------------------------------*/
//Función que solo pide un dato
export const getProductById = async (id) => {
  try {
    //Creamos la referencia al documento
    const productRef = doc(productsRef, id);

    //Traemos el documento
    const snapshot = await getDoc(productRef);

    //Verificamos si existe
    if (snapshot.exists()) {
      const product = { id: snapshot.id, ...snapshot.data() };
      console.log("Doc:", product);
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al traer producto por ID:", error);
    throw error;
  }
};

/*----------------------------------------------------------------------*/
/*                       SI FILTRAMOS POR CATEGORIA                      */
/*----------------------------------------------------------------------*/
export const getByCategory = async (category) => {
  try {
    let queryRef;

    //truthy
    if (category) {
      queryRef = query(productsRef, where("category", "==", category));
    } else {
      queryRef = productsRef;
    }

    //Traer los documentos:
    const snapshot = await getDocs(queryRef);
    //Mapeo de datos para formateo
    const productsFormat = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return productsFormat;
  } catch (error) {
    console.error("Error al filtrar productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                              ALTA DE PRODUCTO                              */
/* -------------------------------------------------------------------------- */
export const createProduct = async (productData) => {
  try {
    //Tan facil como usar la funcion addDoc y pasarle la coleccion y el doc a agregar
    const docRef = await addDoc(productsRef, productData);

    return docRef.id; // opcional, por si quieren usar el id para algo
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};
