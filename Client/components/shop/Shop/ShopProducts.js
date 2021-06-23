import { ProductGridListWrapper } from "../ProductThumb";
import { Row } from "react-bootstrap";

const ShopProducts = ({ layout, category }) => {
  return (
    <div className="shop-products">
      <Row className={layout}>
        <ProductGridListWrapper
          // products={products}
          bottomSpace="space-mb--50"
          category={category}
        />
      </Row>
    </div>
  );
};

export default ShopProducts;
