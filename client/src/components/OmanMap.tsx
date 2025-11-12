import { useState } from "react";
import { MapPin, Users, TrendingUp } from "lucide-react";

interface Region {
  id: string;
  name: string;
  providers: number;
  x: number; // Percentage from left
  y: number; // Percentage from top
  description: string;
}

const regions: Region[] = [
  {
    id: "muscat",
    name: "Muscat",
    providers: 4500,
    x: 75,
    y: 30,
    description: "Capital city with the highest concentration of service providers",
  },
  {
    id: "salalah",
    name: "Salalah",
    providers: 1800,
    x: 20,
    y: 75,
    description: "Major commercial hub in southern Oman",
  },
  {
    id: "sohar",
    name: "Sohar",
    providers: 1200,
    x: 15,
    y: 25,
    description: "Industrial port city with growing service sector",
  },
  {
    id: "nizwa",
    name: "Nizwa",
    providers: 800,
    x: 50,
    y: 40,
    description: "Historic city with expanding professional services",
  },
  {
    id: "sur",
    name: "Sur",
    providers: 600,
    x: 85,
    y: 50,
    description: "Coastal city with maritime and tourism services",
  },
  {
    id: "ibri",
    name: "Ibri",
    providers: 400,
    x: 30,
    y: 35,
    description: "Growing regional center for business services",
  },
  {
    id: "other",
    name: "Other Regions",
    providers: 700,
    x: 60,
    y: 70,
    description: "Service providers across all other regions of Oman",
  },
];

export default function OmanMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const totalProviders = regions.reduce((sum, region) => sum + region.providers, 0);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>Oman Coverage</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Service Provider Network Across Oman
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our network spans all major regions of Oman, connecting businesses with verified professionals nationwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Visualization */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg overflow-hidden">
              {/* Simplified Oman Map Shape */}
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Oman outline (simplified) */}
                <path
                  d="M 200 50 L 350 80 L 380 150 L 350 220 L 200 250 L 50 220 L 20 150 L 50 80 Z"
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                />
              </svg>

              {/* Region Markers */}
              {regions.map((region) => {
                const leftPercent = region.x;
                const topPercent = region.y;
                return (
                <div
                  key={region.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => setSelectedRegion(region)}
                >
                  <div
                    className={`relative transition-all duration-300 ${
                      hoveredRegion === region.id || selectedRegion?.id === region.id
                        ? "scale-125 z-10"
                        : "scale-100"
                    }`}
                  >
                    <MapPin
                      className={`w-8 h-8 transition-colors ${
                        hoveredRegion === region.id || selectedRegion?.id === region.id
                          ? "text-blue-600 fill-blue-600"
                          : "text-blue-400 fill-blue-400"
                      }`}
                    />
                    <div
                      className={`absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transition-all ${
                        hoveredRegion === region.id || selectedRegion?.id === region.id
                          ? "scale-110"
                          : ""
                      }`}
                    >
                      {region.providers > 999
                        ? `${(region.providers / 1000).toFixed(1)}k`
                        : region.providers}
                    </div>
                  </div>

                  {/* Region Label */}
                  <div
                    className={`absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-opacity ${
                      hoveredRegion === region.id || selectedRegion?.id === region.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg">
                      {region.name}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-600">Service Provider Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Provider Count</span>
              </div>
            </div>
          </div>

          {/* Region Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalProviders.toLocaleString()}+
                  </p>
                  <p className="text-sm text-gray-600">Total Service Providers</p>
                </div>
              </div>
              <p className="text-gray-600">
                Verified professionals across all regions of Oman, ready to serve your business needs
              </p>
            </div>

            {/* Region List */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Top Regions</h3>
              {regions
                .sort((a, b) => b.providers - a.providers)
                .slice(0, 5)
                .map((region) => (
                  <div
                    key={region.id}
                    className={`bg-white rounded-lg p-4 border-2 transition-all cursor-pointer ${
                      selectedRegion?.id === region.id
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{region.name}</p>
                          <p className="text-sm text-gray-500">{region.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          {region.providers.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">providers</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Selected Region Details */}
            {selectedRegion && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <h4 className="text-2xl font-bold">{selectedRegion.name}</h4>
                </div>
                <p className="text-blue-100 mb-4">{selectedRegion.description}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-3xl font-bold">{selectedRegion.providers.toLocaleString()}</p>
                    <p className="text-sm text-blue-100">Service Providers</p>
                  </div>
                  <div className="flex-1 h-px bg-blue-400"></div>
                  <div>
                    <p className="text-3xl font-bold">
                      {((selectedRegion.providers / totalProviders) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-blue-100">of Total Network</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">+25%</p>
            <p className="text-gray-600">Growth in Last 6 Months</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">7 Regions</p>
            <p className="text-gray-600">Covered Across Oman</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">100%</p>
            <p className="text-gray-600">Verified Professionals</p>
          </div>
        </div>
      </div>
    </section>
  );
}

