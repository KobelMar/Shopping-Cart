import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", price: 6, title: "My first Book", description: "blablabal" },
  { id: "p2", price: 9, title: "My second Book", description: "blablabal" },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
