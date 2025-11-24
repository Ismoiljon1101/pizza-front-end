const statistics = [
  { label: "Restaurants", value: "12" },
  { label: "Experience", value: "8" },
  { label: "Menu", value: "50+" },
  { label: "Clients", value: "200+" },
];

export default function Statistics() {
  return (
    <section className="container mx-auto px-2 md:px-4">
      <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <p className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-1 md:mt-2 lg:mt-3 text-[8px] md:text-[10px] lg:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] lg:tracking-[0.3em] text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}