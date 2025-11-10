import { useEffect, useState } from 'react';
import { Users, TrendingUp, Award, Zap } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8" />,
    label: 'Active Users',
    value: 181,
    suffix: '+',
    description: 'Growing community of satisfied users',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    label: 'Contracts Managed',
    value: 847,
    suffix: '',
    description: 'Successfully processed and tracked',
  },
  {
    icon: <Award className="w-8 h-8" />,
    label: 'Cost Reduction',
    value: 40,
    suffix: '%',
    description: 'Average savings for our customers',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    label: 'Time Saved',
    value: 20,
    suffix: 'h/week',
    description: 'Per team member on average',
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}</>;
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real numbers from real businesses using TheSmartPro.io
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{stat.icon}</div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="text-5xl font-bold text-primary">
                  <AnimatedCounter target={stat.value} />
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Join hundreds of companies achieving their goals with TheSmartPro.io
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Your Free Trial
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
