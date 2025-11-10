import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  smartpro: boolean;
  competitor1: boolean;
  competitor2: boolean;
}

const features: Feature[] = [
  { name: 'Employee Management', smartpro: true, competitor1: true, competitor2: false },
  { name: 'CRM System', smartpro: true, competitor1: false, competitor2: true },
  { name: 'Project Management', smartpro: true, competitor1: true, competitor2: true },
  { name: 'E-Learning Platform', smartpro: true, competitor1: false, competitor2: false },
  { name: 'Contract Management', smartpro: true, competitor1: false, competitor2: false },
  { name: 'Workflow Automation', smartpro: true, competitor1: true, competitor2: false },
  { name: 'Advanced Analytics', smartpro: true, competitor1: false, competitor2: true },
  { name: 'API Access', smartpro: true, competitor1: true, competitor2: true },
  { name: '24/7 Support', smartpro: true, competitor1: false, competitor2: true },
  { name: 'Custom Integrations', smartpro: true, competitor1: false, competitor2: false },
];

export default function FeaturesComparison() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>⚖️ How We Compare</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose TheSmartPro.io?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we stack up against the competition
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 font-semibold">Feature</th>
                <th className="text-center py-4 px-6 font-semibold">
                  <div className="inline-flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold">S</span>
                    </div>
                    <span>TheSmartPro.io</span>
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  <div className="inline-flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-700 font-bold">A</span>
                    </div>
                    <span>Competitor A</span>
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  <div className="inline-flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-700 font-bold">B</span>
                    </div>
                    <span>Competitor B</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`border-b border-border ${
                    index % 2 === 0 ? 'bg-muted/30' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {feature.smartpro ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.competitor1 ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.competitor2 ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
          <p className="text-muted-foreground">
            TheSmartPro.io is the only all-in-one platform that combines employee
            management, CRM, project management, e-learning, and contract management
            in one unified system.
          </p>
        </div>
      </div>
    </section>
  );
}
