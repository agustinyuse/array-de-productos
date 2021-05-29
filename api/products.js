class Products {
  constructor() {
    this.products = [];
  }

  get = () => {
    return this.products;
  };

  getById = (id) => {
    return this.products.find((p) => p.id === id);
  };

  save = (product) => {
    this.products.push(product);
  };
}

module.exports = new Products();
