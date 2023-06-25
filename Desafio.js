const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath; // ruta a trabajar.
    console.log("Product Manager creado con exito")
  }

  addProduct(product) {  // creador de productos nuevos.
    const products = this.getProducts();
    product.id = this.getNextId(products);
    products.push(product);
    this.saveProducts(products);
    console.log("Producto agregado con exito, con ID", product.id)
    return product.id;
  }

  getProductById(id) { // lector de prodcutos segun su ID
    const products = this.getProducts();
    return products.find(product => product.id === id),
    console.log('Producto obtenido por ID:', products.find(product => product.id === id));
  }

  updateProduct(id, updatedFields) { // actualizacion de produtos segun id
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct, console.log('Producto actualizado:', updatedProduct);
    }
    return null;
  }

  deleteProduct(id) { // borrador de productos segun id.
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.saveProducts(products);
    }
    console.log('Producto eliminado');
  }

  getProducts() {  // carga de productos del un archivo externo JSON.
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      console.log("los prodcutos que hay el archivo son", JSON.parse(data));
      return JSON.parse(data) || [];
    } catch (error) {
      console.log ([])
      return [];
    }
  }

  saveProducts(products) {  // guardado de el archivo.
    fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');
  }

  getNextId(products) {  // funcion para asegurar que el id de un nuevo objeto sea nuevo y no coincida con el de otro objeto.
    const maxId = products.reduce((max, product) => {
      return product.id > max ? product.id : max;
    }, 0);
    return maxId + 1;
  }
}


// TESTING ENTREGABLE.



/*  const productManager = new ProductManager('C:\Users\mauro\OneDrive\Escritorio\Escritorio\Programacion\CoderHouse\Back-End\Desafio - 2\Prueba'); */

// Se llama a los ver el arreglo antes de agregar los productos para obtener el array vacio



/* // Agregar un producto
const productId = productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 10.99,
  code: 'P2',
  stock: 100
});

productManager.getProducts();

// Obtener un producto por ID
const product = productManager.getProductById(1);

// Actualizar un producto
const updatedProduct = productManager.updateProduct(1, {
  description: 'Descripción actualizada'
});


// Eliminar un producto
productManager.deleteProduct(1);
 */