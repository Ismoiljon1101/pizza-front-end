import { Eye, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

interface PopularDishesProps {
  limit?: number;
}

export default function PopularDishes({ limit = 4 }: PopularDishesProps) {
  const { popularDishes } = useSelector(popularDishesRetriever);
  const displayedDishes = popularDishes.slice(0, limit);
  const history = useHistory();

  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-6 lg:p-12 xl:p-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 space-y-3 md:space-y-6 lg:space-y-10">
          <div className="text-center">
            <p className="text-[9px] md:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">
              Signature picks
            </p>
            <h2 className="mt-1 md:mt-2 lg:mt-3 text-lg md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight">Popular Dishes</h2>
            <p className="mt-1 md:mt-2 lg:mt-3 text-[10px] md:text-base lg:text-lg text-muted-foreground">
              The crowd favorites everyone keeps coming back for.
            </p>
          </div>

          {displayedDishes.length === 0 ? (
            <div className="flex justify-center rounded-xl border border-dashed border-muted-foreground/40 p-12 text-muted-foreground">
              Popular products are not available.
            </div>
          ) : (
            <div className="grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
              {displayedDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <article
                    key={product._id}
                    onClick={() => history.push(`/products/${product._id}`)}
                    className="glass-card group overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                  >
                    <div className="relative h-28 md:h-48 lg:h-64 overflow-hidden">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4 lg:p-6 text-white">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-[10px] md:text-lg lg:text-2xl font-bold line-clamp-1">
                            {product.productName}
                          </h3>
                          <span className="flex items-center gap-0.5 md:gap-1 text-[8px] md:text-xs lg:text-sm bg-white/20 backdrop-blur-sm px-1 md:px-2 py-0.5 md:py-1 rounded-full flex-shrink-0">
                            <Eye className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                            {product.productViews}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1 md:gap-3 border-t border-white/10 px-2 md:px-4 lg:px-6 py-1.5 md:py-3 lg:py-4 text-[9px] md:text-xs lg:text-sm text-muted-foreground">
                      <FileText className="h-2.5 w-2.5 md:h-4 md:w-4 shrink-0 text-primary mt-0.5" />
                      <p className="line-clamp-2 leading-tight">{product.productDesc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}