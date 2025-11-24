import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { ChevronLeft, ChevronRight } from "lucide-react";

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 space-y-4 md:space-y-8">
          <div className="text-center">
            <p className="text-[9px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary font-bold">
              Community
            </p>
            <h2 className="mt-1 md:mt-2 text-lg md:text-3xl font-semibold">Active Members</h2>
            <p className="mt-1 md:mt-2 text-[10px] md:text-base text-muted-foreground">
              Meet the people who inspire our kitchen daily.
            </p>
          </div>

          {topUsers.length === 0 ? (
            <div className="flex justify-center rounded-xl border border-dashed border-muted-foreground/40 p-12 text-muted-foreground">
              Active users are not available.
            </div>
          ) : (
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1280: { slidesPerView: 6 },
                }}
                navigation={{
                  nextEl: ".active-users-next",
                  prevEl: ".active-users-prev",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={topUsers.length > 6}
                className="!px-1"
              >
                {topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <SwiperSlide key={member._id}>
                      <article className="glass-card flex flex-col items-center rounded-xl md:rounded-2xl p-3 md:p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-2 md:mb-4 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 overflow-hidden rounded-full border-2 md:border-4 border-white/20 bg-muted shadow-md">
                          <img
                            src={imagePath}
                            alt={member.memberNick}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="text-xs md:text-base font-semibold line-clamp-1">
                          {member.memberNick}
                        </h3>
                        <p className="mt-0.5 md:mt-1 text-[9px] md:text-xs text-muted-foreground line-clamp-1">
                          {member.memberAddress || "Address not provided"}
                        </p>
                      </article>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Navigation Buttons */}
              <button className="active-users-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full glass border border-white/20 hover:bg-white/20 transition">
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <button className="active-users-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full glass border border-white/20 hover:bg-white/20 transition">
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}