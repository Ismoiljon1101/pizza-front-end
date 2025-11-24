import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { plans } from "../../../lib/data/plans";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Events() {
  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 space-y-4 md:space-y-8">
          <div className="text-center">
            <p className="text-[9px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">
              Events
            </p>
            <h2 className="mt-1 md:mt-3 text-lg md:text-3xl font-semibold">What's happening</h2>
            <p className="mt-1 md:mt-2 max-w-2xl mx-auto text-[10px] md:text-base text-muted-foreground">
              Special tastings, chef tables, and collaborations across the city.
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                nextEl: ".events-next",
                prevEl: ".events-prev",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1000}
              loop={plans.length > 3}
              className="!px-1"
            >
              {plans.map((value, number) => (
                <SwiperSlide key={number}>
                  <article className="glass-card rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="overflow-hidden rounded-lg md:rounded-2xl">
                      <img
                        src={value.img}
                        className="h-32 md:h-48 lg:h-56 w-full object-cover hover:scale-105 transition-transform duration-500"
                        alt={value.title}
                      />
                    </div>
                    <div className="space-y-2 md:space-y-4 pt-3 md:pt-6">
                      <div>
                        <p className="text-[8px] md:text-sm uppercase tracking-widest text-primary font-bold">
                          {value.author}
                        </p>
                        <h3 className="text-sm md:text-xl lg:text-2xl font-semibold mt-1">{value.title}</h3>
                        <p className="mt-1 md:mt-2 text-[10px] md:text-sm text-muted-foreground line-clamp-2">{value.desc}</p>
                      </div>

                      <div className="space-y-1 md:space-y-2 text-[9px] md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <img src={"/icons/calendar.svg"} alt="" className="h-3 md:h-4 opacity-70" />
                          {value.date}
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <img src={"/icons/location.svg"} alt="" className="h-3 md:h-4 opacity-70" />
                          {value.location}
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="events-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full glass border border-white/20 hover:bg-white/20 transition">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button className="events-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full glass border border-white/20 hover:bg-white/20 transition">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}