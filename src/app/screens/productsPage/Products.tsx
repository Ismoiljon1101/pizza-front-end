import {Badge,Box,Button,Card,CardMedia,Container,InputAdornment,Stack,TextField,} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import RemoveRedIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { ChangeEvent,  useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

  /** REDUX SLICE & SELECTOR**/

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector (
  retrieveProducts,
  (products) => ({products})
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}
function Products(props: ProductsProps) {

    const {onAdd} = props;
    const {setProducts} = actionDispatch(useDispatch());
    const  { products } = useSelector(productsRetriever);

const [productSearch,  setProductSearch] = useState<ProductInquiry>({
  page: 1,
  limit: 8,
  order: "createdAt",
  productCollection: ProductCollection.PIZZA,
  search: "",
});

const [searchText, setSearchText] = useState<string>("")
const history  = useHistory();

    useEffect(() => {
      const product =new ProductService();
      product
      .getProducts(productSearch)
      .then(data => setProducts(data))
      .catch(err => console.log(err));
    }, [productSearch]);

    useEffect(() => {
      if(searchText === "") {
        productSearch.search = "";
        setProductSearch({ ...productSearch });
      }
    }, [searchText]);
  /*Handlers */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler =(order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  }

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch })
  }

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value
    setProductSearch({ ...productSearch })
  }

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`)
  }
    return (
      <div className="products">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Stack className={"avatar-big-box"}>
              <Box className={"category-title"}>Pizza House</Box>
              <Stack className="avatar-search-box" >
              <TextField
                variant="outlined"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === "Enter") searchProductHandler();
                }}
              
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button 
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<SearchIcon />}
                        onClick={searchProductHandler}
                        sx={{borderRadius:"18.5px"}}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            </Stack>
            <Stack className={"dishes-filter-box"}>
              <Button variant={"contained"} 
              color={productSearch.order === "createdAt" ? "primary" : "secondary"} 
              className={"order"}
              onClick={() => {searchOrderHandler("createdAt")}}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={ productSearch.order === "productPrice" ? "primary" : "secondary"}
                className={"order"}
                onClick={() => {searchOrderHandler("productPrice")}}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={ productSearch.order === "productViews" ? "primary" : "secondary"}
                className={"order"}
                onClick={() => {searchOrderHandler("productViews")}}
              >
                Views
              </Button>
            </Stack>
            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
              <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"} 
              onClick={() => searchCollectionHandler(ProductCollection.OTHER)}> 
                    OTHER
                  </Button>
                  <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"}
                  onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                    SALADS
                  </Button>
                  <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"}
                  onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                    DRINK
                  </Button>
                  <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                  onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>
                    DESSERT
                  </Button>
                  <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.PIZZA ? "primary" : "secondary"}
                  onClick={() => searchCollectionHandler(ProductCollection.PIZZA)}>
                    PIZZA
                  </Button>
              </Stack>
  
              <Stack className={"product-wrapper"}>
                {products.length !== 0 ? (
                    products.map((product: Product) => {
                      const imagePath = `${serverApi}/${product.productImages[0]}`
                      const sizeVolume = product.productCollection === ProductCollection.DRINK ? product.productVolume + "litre" : product.productSize + "size";
                      return(
                    <Stack key={product._id} className={"product-card"}
                    onClick={() => chooseDishHandler(product._id)}>
                        <Stack
                        className={"product-img"}
                        sx={{
                            backgroundImage: `url(${imagePath})`,
                            backgroundSize: "cover",
                        }}
                        >
                        <Box className="product-sale">{sizeVolume}</Box>
                        <Stack>
                            <Box>
                            <Button className={"shop-btn"}
                            onClick={(e) => {
                              console.log("BUTTON PRESSED");
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              }
                              );
                              e.stopPropagation();
                            }}>
                                <img
                                src={"/icons/shopping-cart.svg"}
                                alt="btn-image"
                                />
                            </Button>
                            </Box>
                            <Box>
                            <Button className={"view-btn"}>
                                <Badge badgeContent={product.productViews} color="secondary">
                                <RemoveRedIcon sx={{ color: product.productViews === 0 ? "grey" : "white", }} />
                                </Badge>
                            </Button>
                            </Box>
                        </Stack>
                        </Stack>
                        <Box className={"product-desc-box"}>
                        <span className={"product-title"}>{product.productName}</span>
                        <div className={"product-desc"}>
                            <MonetizationOnIcon />
                            {product.productPrice}
                        </div>
                        </Box>
                    </Stack>
                    )}
                  )
                ) : (
                    <Box className="no-data">New Products are not available!</Box>
                )}
                </Stack>

            </Stack>
  
            <Stack className={"pagination-section"}>
              <Pagination
                count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Container>
        <div className={"brands-logo"}>
          <Container className={"family-brands"}>
            <Box className={"category-title"}>Our Partners</Box>
            <Stack className={"brand-list"}>
              <Box>
                <Card className="card-media">
                  <CardMedia
                    component="img"
                    image="../../../img/gurme.svg"
                    alt="green iguana"
                  />
                </Card>
              </Box>
              <Box>
                <Card className="card-media">
                  <CardMedia
                    component="img"
                    image="../../../img/seafood.svg"
                    alt="green iguana"
                  />
                </Card>
              </Box>
              <Box>
                <Card className="card-media">
                  <CardMedia
                    component="img"
                    image="../../../img/sweets.svg"
                    alt="green iguana"
                  />
                </Card>
              </Box>
              <Box>
                <Card className="card-media">
                  <CardMedia
                    component="img"
                    image="../../../img/donar.svg"
                    alt="green iguana"
                  />
                </Card>
              </Box>
            </Stack>
          </Container>
        </div>
  
        <div className={"address"}>
          <Container>
            <Stack>
              <Box className={"category-title"}>Our Address</Box>
              <iframe className="map"
                title="our address"
                style={{ marginTop: "60px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11647919.37548628!2d-0.6359697893832288!3d44.541154174127534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133ed05d42fd4e31%3A0x37168290eedca735!2sPizza%20House!5e0!3m2!1sen!2skr!4v1739156789835!5m2!1sen!2skr"
                width={"1260"}
                height={"500"}
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Stack>
          </Container>
        </div>
      </div>
    );
  }
  
  export default Products;