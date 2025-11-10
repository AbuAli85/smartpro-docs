import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin } from "lucide-react";

interface Service {
  id: string;
  provider: string;
  service: string;
  client: string;
  location: string;
  status: "completed" | "in-progress" | "pending";
  timestamp: Date;
  rating?: number;
  amount: number;
}

const serviceTypes = [
  "Web Development",
  "UI/UX Design",
  "Business Consulting",
  "Marketing Strategy",
  "Content Writing",
  "Social Media Management",
  "Video Production",
  "Graphic Design",
];

const providers = [
  "Ahmed Al Mazrouei",
  "Fatima Al Balushi",
  "Mohammed Al Harthi",
  "Layla Al Lawati",
  "Hassan Al Amri",
  "Noor Al Kindi",
];

const locations = ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Ibri"];

const generateRandomService = (): Service => {
  const statuses: Array<"completed" | "in-progress" | "pending"> = [
    "completed",
    "in-progress",
    "pending",
  ];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    provider: providers[Math.floor(Math.random() * providers.length)],
    service: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
    client: `Client ${Math.floor(Math.random() * 1000)}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    status,
    timestamp: new Date(),
    rating: status === "completed" ? Math.floor(Math.random() * 2) + 4 : undefined,
    amount: Math.floor(Math.random() * 1500) + 300,
  };
};

export default function LiveServiceFeed() {
  const [services, setServices] = useState<Service[]>([]);

  // Initialize with some services
  useEffect(() => {
    const initialServices = Array.from({ length: 5 }, () =>
      generateRandomService()
    );
    setServices(initialServices);
  }, []);

  // Add new services periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setServices((prev) => [generateRandomService(), ...prev.slice(0, 4)]);
    }, 3000); // Add new service every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Live Service Activity
          </h2>
          <p className="text-xl text-gray-600">
            Real-time bookings happening on SmartPRO right now
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="p-4 hover:shadow-lg transition-shadow border border-gray-200 animate-in fade-in slide-in-from-top-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{service.service}</h3>
                    <Badge className={`${getStatusColor(service.status)}`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(service.status)}
                        {service.status.charAt(0).toUpperCase() +
                          service.status.slice(1)}
                      </span>
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-900">
                        {service.provider}
                      </span>{" "}
                      booked by {service.client}
                    </p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {service.location}
                    </div>
                  </div>
                </div>

                {/* Right content */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    OMR {service.amount}
                  </p>
                  {service.rating && (
                    <p className="text-sm text-yellow-500 mt-1">
                      ★ {service.rating.toFixed(1)} rating
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Just now</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">847K</p>
            <p className="text-sm text-gray-600">Total Services Booked</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">94.2%</p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">4.8★</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
