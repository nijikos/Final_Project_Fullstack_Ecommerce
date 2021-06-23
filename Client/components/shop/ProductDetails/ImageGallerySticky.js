import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import { IoMdExpand, IoIosHeartEmpty } from "react-icons/io";
import { Tooltip } from "react-tippy";

const ImageGallerySticky = ({
  product,
  wishlistItem,
  addToast,
  addToWishlist,
  deleteFromWishlist,
}) => {
  let { id } = useParams();
  console.log("this is from useParams: ", id);

  console.log("THIS IS PRODUCT FROM IMGSTICKY:", product);
  return (
    <Fragment>
      {/* <p>This is Images</p> */}
      <div className="product-large-image-wrapper space-mb--n10">
        <LightgalleryProvider>
          {product &&
            product.map((item, i) => {
              return (
                <div key={i}>
                  <LightgalleryItem group="any" src={item.url}>
                    <Tooltip
                      title="Click to enlarge"
                      position="left"
                      trigger="mouseenter"
                      animation="shift"
                      arrow={true}
                      duration={200}
                    >
                      <button className="enlarge-icon">
                        <IoMdExpand />
                      </button>
                    </Tooltip>
                  </LightgalleryItem>
                  <div className="single-image space-mb--10">
                    <img src={item.url} className="img-fluid" alt="" />
                  </div>
                </div>
              );
            })}
        </LightgalleryProvider>
      </div>
    </Fragment>
  );
};

export default ImageGallerySticky;
