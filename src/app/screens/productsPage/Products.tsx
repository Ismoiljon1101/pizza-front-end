import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { useEffect, useMemo, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, ArrowRight, Eye, Search, ShoppingCart, SlidersHorizontal } from "lucide-react";

/** REDUX SLICE & SELECTOR **/

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

function Products(props: ProductsProps) {
  const { onAdd } = props;
  const dispatch = useDispatch();
  const { setProducts } = useMemo(() => actionDispatch(dispatch), [dispatch]);
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    productCollection: ProductCollection.PIZZA,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch, setProducts]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({ ...prev, search: "" }));
    }
  }, [searchText]);

  /* Handlers */
  const searchCollectionHandler = (collection: ProductCollection) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productCollection: collection,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((prev) => ({
      ...prev,
      search: searchText,
    }));
  };

  const paginationHandler = (value: number) => {
    setProductSearch((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const pageCount =
    products.length !== 0 ? productSearch.page + 1 : productSearch.page;

  const orderFilters = [
    { key: "createdAt", label: "New" },
    { key: "productPrice", label: "Price" },
    { key: "productViews", label: "Views" },
  ];

  const collections = [
    ProductCollection.OTHER,
    ProductCollection.SALAD,
    ProductCollection.DRINK,
    ProductCollection.DESSERT,
    ProductCollection.PIZZA,
  ];

  return (
    <div className="min-h-screen bg-background pt-2 md:pt-20 pb-20 md:pb-8">
      <div className="container mx-auto px-3 md:px-6 py-3 md:py-6">
        {/* Top Bar: Search & Filters */}
        <div className="bg-card rounded-lg border border-border p-2 md:p-4 mb-3 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Search */}
            <div className="flex-1 flex gap-2">
              <Input
                placeholder='Search products...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
                className="h-10 md:h-11"
              />
              <Button className="h-10 md:h-11 px-4" onClick={searchProductHandler}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground self-center hidden md:block" />
              {orderFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={productSearch.order === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => searchOrderHandler(filter.key)}
                  className="h-10 md:h-11"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {collections.map((collection) => (
              <Button
                key={collection}
                variant={productSearch.productCollection === collection ? "secondary" : "ghost"}
                size="sm"
                onClick={() => searchCollectionHandler(collection)}
                className="whitespace-nowrap"
              >
                {collection}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.length !== 0 ? (
            products.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const sizeVolume =
                product.productCollection === ProductCollection.DRINK
                  ? `${product.productVolume} l`
                  : `${product.productSize} size`;
              return (
                <article
                  key={product._id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => chooseDishHandler(product._id)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-muted/20 overflow-hidden">
                    <img
                      src={imagePath}
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 text-xs">{sizeVolume}</Badge>
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {product.productViews}
                    </Badge>
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1 min-h-[2.5rem] md:min-h-[3rem]">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {product.productDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-bold text-primary">
                        ${product.productPrice}
                      </span>
                      <Button
                        size="sm"
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
          <Button
            variant="outline"
            size="icon"
            disabled={productSearch.page === 1}
            onClick={() => paginationHandler(productSearch.page - 1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: pageCount }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={pageNumber}
                variant={productSearch.page === pageNumber ? "default" : "outline"}
                onClick={() => paginationHandler(pageNumber)}
                className="w-10 h-10"
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginationHandler(productSearch.page + 1)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Products;
