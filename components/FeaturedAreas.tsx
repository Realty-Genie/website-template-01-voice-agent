import Image from "next/image"

const areas = [
  { name: "Burnaby", image: "/burnaby.jpg" },
  { name: "Vancouver", image: "/vancover.jpg" },
  { name: "Coquitlam", image: "/coquitlum.png" },
  { name: "Port Coquitlam", image: "/port.jpg" },
  { name: "West Vancouver", image: "/west_vancover.jpg" },
  { name: "North Vancouver", image: "/north_vancover.jpg" },
]

export default function FeaturedAreas() {
  return (
    <section className="py-20 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase opacity-90 block">
            Neighbourhoods
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Featured Areas
          </h2>
          <div className="w-20 h-[1px] bg-primary mx-auto mt-6 opacity-60" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="group relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg transform transition-all duration-500 group-hover:bg-white/20 group-hover:scale-105 group-hover:border-primary/50">
                  <span className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                    {area.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
