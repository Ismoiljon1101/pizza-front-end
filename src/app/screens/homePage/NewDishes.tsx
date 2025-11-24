import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { useHistory } from "react-router-dom"
import { Eye } from "lucide-react"
import { Product } from "../../../lib/types/product"
import { serverApi } from "../../../lib/config"
import { retrieveNewDishes } from "./selector"
import { ProductCollection } from "../../../lib/enums/product.enum"

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({ newDishes }))

interface NewDishesProps {
  limit?: number
}

export default function NewDishes({ limit = 4 }: NewDishesProps) {
  const { newDishes } = useSelector(newDishesRetriever)
  const displayedDishes = newDishes.slice(0, limit)
  const history = useHistory()

  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-6 lg:p-12 xl:p-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 space-y-3 md:space-y-6 lg:space-y-10">
          <div className="text-center">
            <p className="text-[9px] md:text-xs lg:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">Just in</p>
            <h2 className="mt-1 md:mt-2 lg:mt-3 text-lg md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight">Fresh Menu</h2>
            <p className="mt-1 md:mt-2 lg:mt-3 text-[10px] md:text-base lg:text-lg text-muted-foreground">Discover the latest additions from our chefs.</p>
          </div>

          {displayedDishes.length === 0 ? (
            <div className="flex justify-center rounded-xl border border-dashed border-muted-foreground/40 p-12 text-muted-foreground">
              New products are not available.
            </div>
          ) : (
            <div className="grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
              {displayedDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? `${product.productVolume} l`
                    : `${product.productSize} size`
                return (
                  <article
                    key={product._id}
                    onClick={() => history.push(`/products/${product._id}`)}
                    className="glass-card overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                  >
                    <div className="relative h-28 md:h-48 lg:h-64 w-full overflow-hidden">
                      <img src={imagePath} alt={product.productName} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
                      <span className="absolute left-1.5 md:left-3 lg:left-4 top-1.5 md:top-3 lg:top-4 rounded-full bg-white/20 backdrop-blur-md px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 text-[7px] md:text-[10px] lg:text-xs font-bold uppercase text-white shadow-sm">
                        {sizeVolume}
                      </span>
                    </div>
                    <div className="space-y-1 md:space-y-3 lg:space-y-4 p-2 md:p-4 lg:p-6">
                      <div className="flex items-center justify-between gap-1 md:gap-2 lg:gap-3">
                        <h3 className="text-[10px] md:text-base lg:text-xl font-bold line-clamp-1">{product.productName}</h3>
                        <p className="text-[10px] md:text-base lg:text-lg font-bold text-primary flex-shrink-0">${product.productPrice}</p>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 text-[8px] md:text-xs lg:text-sm text-muted-foreground">
                        <Eye className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                        <span>{product.productViews} views</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
