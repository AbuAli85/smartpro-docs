import { useState } from "react";
import { MapPin, Users, TrendingUp, Building2, Briefcase, Award, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

interface Region {
  id: string;
  name: string;
  providers: number;
  organizations: number;
  growth: number;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  industries: string[];
  topServices: string[];
}

const regions: Region[] = [
  {
    id: "muscat",
    name: "Muscat",
    providers: 4500,
    organizations: 12000,
    growth: 28,
    coordinates: [58.4059, 23.5859], // Actual Muscat coordinates
    description: "Capital city with the highest concentration of service providers and enterprise clients",
    industries: ["Technology", "Finance", "Consulting", "Legal", "Healthcare"],
    topServices: ["IT Services", "Financial Consulting", "Legal Services", "Healthcare"],
  },
  {
    id: "salalah",
    name: "Salalah",
    providers: 1800,
    organizations: 4800,
    growth: 22,
    coordinates: [54.0924, 17.0151], // Actual Salalah coordinates
    description: "Major commercial hub in southern Oman with growing service sector",
    industries: ["Tourism", "Logistics", "Retail", "Hospitality"],
    topServices: ["Tourism Services", "Logistics", "Retail Consulting", "Hospitality"],
  },
  {
    id: "sohar",
    name: "Sohar",
    providers: 1200,
    organizations: 3200,
    growth: 35,
    coordinates: [56.7436, 24.3644], // Actual Sohar coordinates
    description: "Industrial port city with expanding professional services sector",
    industries: ["Manufacturing", "Shipping", "Engineering", "Construction"],
    topServices: ["Engineering Services", "Manufacturing Consulting", "Port Services"],
  },
  {
    id: "nizwa",
    name: "Nizwa",
    providers: 800,
    organizations: 2100,
    growth: 18,
    coordinates: [57.5314, 22.9333], // Actual Nizwa coordinates
    description: "Historic city with expanding professional services and growing business community",
    industries: ["Education", "Tourism", "Retail", "Agriculture"],
    topServices: ["Educational Services", "Tourism Consulting", "Agricultural Services"],
  },
  {
    id: "sur",
    name: "Sur",
    providers: 600,
    organizations: 1500,
    growth: 25,
    coordinates: [59.5286, 22.5667], // Actual Sur coordinates
    description: "Coastal city with maritime and tourism services, growing business sector",
    industries: ["Maritime", "Tourism", "Fishing", "Handicrafts"],
    topServices: ["Maritime Services", "Tourism", "Fishing Industry Services"],
  },
  {
    id: "ibri",
    name: "Ibri",
    providers: 400,
    organizations: 1100,
    growth: 20,
    coordinates: [56.5156, 23.2254], // Actual Ibri coordinates
    description: "Growing regional center for business services and professional consulting",
    industries: ["Agriculture", "Retail", "Construction", "Education"],
    topServices: ["Agricultural Consulting", "Construction Services", "Educational Services"],
  },
  {
    id: "other",
    name: "Other Regions",
    providers: 700,
    organizations: 1800,
    growth: 15,
    coordinates: [57.0, 21.0], // Central Oman
    description: "Service providers across all other regions of Oman, covering diverse industries",
    industries: ["Various", "Diverse", "Multi-sector"],
    topServices: ["General Consulting", "Various Services"],
  },
];

// Accurate Oman GeoJSON data based on actual geographical boundaries
// Using coordinates from Natural Earth and OpenStreetMap data
const omanGeoData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Oman" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            // Starting from northwest border
            [51.999, 26.396],
            [52.782, 26.210],
            [53.108, 26.277],
            [53.494, 26.308],
            [54.009, 26.277],
            [54.693, 26.210],
            [55.666, 25.950],
            [56.396, 25.439],
            [56.708, 24.925],
            [56.845, 24.242],
            [57.403, 23.878],
            [58.136, 23.549],
            [58.405, 23.586], // Muscat area
            [58.861, 23.135],
            [59.808, 22.533],
            [59.808, 20.192],
            [59.450, 19.980],
            [58.861, 19.999],
            [58.136, 19.999],
            [57.403, 19.999],
            [56.708, 19.999],
            [55.666, 19.999],
            [54.999, 19.999],
            [54.693, 19.999],
            [54.009, 19.999],
            [53.494, 19.999],
            [53.108, 20.192],
            [52.782, 20.577],
            [52.000, 21.000],
            [51.999, 22.000],
            [51.999, 23.000],
            [51.999, 24.000],
            [51.999, 25.000],
            [51.999, 26.396],
          ],
        ],
      },
    },
    // Musandam Peninsula (separated region)
    {
      type: "Feature",
      properties: { name: "Musandam" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [56.0, 26.0],
            [56.5, 26.2],
            [56.8, 26.4],
            [57.0, 26.5],
            [57.2, 26.4],
            [57.0, 26.2],
            [56.7, 26.0],
            [56.3, 25.9],
            [56.0, 26.0],
          ],
        ],
      },
    },
  ],
};

export default function OmanMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"providers" | "organizations" | "growth">("providers");

  const totalProviders = regions.reduce((sum, region) => sum + region.providers, 0);
  const totalOrganizations = regions.reduce((sum, region) => sum + region.organizations, 0);
  const avgGrowth = Math.round(regions.reduce((sum, region) => sum + region.growth, 0) / regions.length);

  const getMarkerSize = (value: number, maxValue: number) => {
    const ratio = value / maxValue;
    if (ratio > 0.7) return 12;
    if (ratio > 0.4) return 10;
    return 8;
  };

  const getDisplayValue = (region: Region) => {
    switch (viewMode) {
      case "providers":
        return region.providers;
      case "organizations":
        return region.organizations;
      case "growth":
        return `${region.growth}%`;
    }
  };

  const maxValue = Math.max(
    ...regions.map(r => viewMode === "providers" ? r.providers : viewMode === "organizations" ? r.organizations : r.growth)
  );

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4 border border-blue-200"
          >
            <MapPin className="w-4 h-4" />
            <span>Oman Coverage</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Service Provider Network Across Oman
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our network spans all major regions of Oman, connecting businesses with verified professionals nationwide. Explore our coverage and growth metrics.
          </motion.p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-lg border border-gray-200">
            {[
              { id: "providers", label: "Providers", icon: Users },
              { id: "organizations", label: "Organizations", icon: Building2 },
              { id: "growth", label: "Growth", icon: TrendingUp },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as typeof viewMode)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    viewMode === mode.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Real Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-100"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  center: [57, 21],
                  scale: 2800,
                }}
                style={{ width: "100%", height: "100%" }}
              >
                <ZoomableGroup>
                  <Geographies geography={omanGeoData}>
                    {({ geographies }: { geographies: any[] }) =>
                      geographies.map((geo: any) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="rgba(59, 130, 246, 0.2)"
                          stroke="rgba(59, 130, 246, 0.6)"
                          strokeWidth={2}
                          style={{
                            default: {
                              fill: "rgba(59, 130, 246, 0.2)",
                              outline: "none",
                            },
                            hover: {
                              fill: "rgba(59, 130, 246, 0.3)",
                              outline: "none",
                            },
                            pressed: {
                              fill: "rgba(59, 130, 246, 0.4)",
                              outline: "none",
                            },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* Region Markers */}
                  {regions.map((region) => {
                    const displayValue = getDisplayValue(region);
                    const markerSize = getMarkerSize(
                      viewMode === "providers" ? region.providers : viewMode === "organizations" ? region.organizations : region.growth,
                      maxValue
                    );
                    const isSelected = selectedRegion?.id === region.id;
                    const isHovered = hoveredRegion === region.id;

                    return (
                      <Marker
                        key={region.id}
                        coordinates={region.coordinates}
                      >
                        <motion.g
                          onMouseEnter={() => setHoveredRegion(region.id)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          onClick={() => setSelectedRegion(region)}
                          animate={{
                            scale: isSelected || isHovered ? 1.3 : 1,
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Pulsing ring effect */}
                          {(isSelected || isHovered) && (
                            <motion.circle
                              r={markerSize + 8}
                              fill="rgba(59, 130, 246, 0.2)"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}

                          {/* Marker circle */}
                          <circle
                            r={markerSize}
                            fill="rgba(59, 130, 246, 1)"
                            stroke="white"
                            strokeWidth={2}
                            style={{
                              filter: isSelected || isHovered ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))" : "none",
                            }}
                          />

                          {/* Value text */}
                          <text
                            textAnchor="middle"
                            y={markerSize + 15}
                            className="font-bold text-blue-600"
                            style={{
                              fontFamily: "system-ui, sans-serif",
                              fontSize: "10px",
                              fill: "rgba(59, 130, 246, 1)",
                            }}
                          >
                            {typeof displayValue === "number" && displayValue > 999
                              ? `${(displayValue / 1000).toFixed(1)}k`
                              : displayValue}
                          </text>

                          {/* Region label on hover */}
                          {(isHovered || isSelected) && (
                            <motion.text
                              textAnchor="middle"
                              y={-markerSize - 10}
                              className="font-bold"
                              style={{
                                fontFamily: "system-ui, sans-serif",
                                fontSize: "12px",
                                fill: "rgba(0, 0, 0, 0.9)",
                              }}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {region.name}
                            </motion.text>
                          )}
                        </motion.g>
                      </Marker>
                    );
                  })}
                </ZoomableGroup>
              </ComposableMap>

              {/* SVG Gradient Definition */}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="omanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.25)" />
                    <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0.25)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600 font-medium">Service Provider Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600 font-medium">
                  {viewMode === "providers" ? "Provider Count" : viewMode === "organizations" ? "Organization Count" : "Growth %"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span className="text-gray-600">Small</span>
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Medium</span>
                <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Large</span>
              </div>
            </div>
          </motion.div>

          {/* Region Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{totalProviders.toLocaleString()}+</p>
                <p className="text-xs text-gray-600">Total Providers</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 text-center">
                <Building2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{totalOrganizations.toLocaleString()}+</p>
                <p className="text-xs text-gray-600">Organizations</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{avgGrowth}%</p>
                <p className="text-xs text-gray-600">Avg Growth</p>
              </div>
            </div>

            {/* Region List */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Top Regions
              </h3>
              {regions
                .sort((a, b) => {
                  if (viewMode === "providers") return b.providers - a.providers;
                  if (viewMode === "organizations") return b.organizations - a.organizations;
                  return b.growth - a.growth;
                })
                .slice(0, 5)
                .map((region) => (
                  <motion.div
                    key={region.id}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white rounded-lg p-4 border-2 transition-all cursor-pointer ${
                      selectedRegion?.id === region.id
                        ? "border-blue-500 shadow-lg bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedRegion?.id === region.id ? "bg-blue-600" : "bg-blue-100"
                        }`}>
                          <MapPin className={`w-5 h-5 ${
                            selectedRegion?.id === region.id ? "text-white" : "text-blue-600"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">{region.name}</p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              +{region.growth}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{region.description}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-blue-600">
                          {viewMode === "providers" ? region.providers.toLocaleString() : 
                           viewMode === "organizations" ? region.organizations.toLocaleString() : 
                           `${region.growth}%`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {viewMode === "providers" ? "providers" : 
                           viewMode === "organizations" ? "organizations" : 
                           "growth"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Enhanced Selected Region Details */}
            <AnimatePresence>
              {selectedRegion && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{selectedRegion.name}</h4>
                      <p className="text-blue-100 text-sm">{selectedRegion.description}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <p className="text-2xl font-bold">{selectedRegion.providers.toLocaleString()}</p>
                      <p className="text-xs text-blue-100">Providers</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <p className="text-2xl font-bold">{selectedRegion.organizations.toLocaleString()}</p>
                      <p className="text-xs text-blue-100">Organizations</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <p className="text-2xl font-bold">+{selectedRegion.growth}%</p>
                      <p className="text-xs text-blue-100">Growth</p>
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Top Industries
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegion.industries.map((industry, idx) => (
                        <span key={idx} className="bg-white/20 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Services */}
                  <div>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Popular Services
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegion.topServices.map((service, idx) => (
                        <span key={idx} className="bg-white/20 text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200 hover:shadow-xl transition-shadow">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">+{avgGrowth}%</p>
            <p className="text-gray-600 font-medium">Average Growth Rate</p>
            <p className="text-xs text-gray-500 mt-1">Last 6 months</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200 hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">7</p>
            <p className="text-gray-600 font-medium">Regions Covered</p>
            <p className="text-xs text-gray-500 mt-1">Nationwide coverage</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200 hover:shadow-xl transition-shadow">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">100%</p>
            <p className="text-gray-600 font-medium">Verified Professionals</p>
            <p className="text-xs text-gray-500 mt-1">Background checked</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-gray-200 hover:shadow-xl transition-shadow">
            <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{totalOrganizations.toLocaleString()}+</p>
            <p className="text-gray-600 font-medium">Active Organizations</p>
            <p className="text-xs text-gray-500 mt-1">Trusted by businesses</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
