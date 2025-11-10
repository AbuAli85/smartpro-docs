import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

export default function CostReductionChart() {
  const comparisonChartRef = useRef<HTMLCanvasElement>(null);
  const breakdownChartRef = useRef<HTMLCanvasElement>(null);
  const comparisonChartInstance = useRef<Chart | null>(null);
  const breakdownChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Cost Comparison Chart
    if (comparisonChartRef.current) {
      const ctx = comparisonChartRef.current.getContext('2d');
      if (ctx) {
        if (comparisonChartInstance.current) {
          comparisonChartInstance.current.destroy();
        }

        const config: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: ['Monthly Cost'],
            datasets: [
              {
                label: 'Before (5+ Tools)',
                data: [1675],
                backgroundColor: 'hsl(5, 78%, 70%)',
                borderRadius: 8,
              },
              {
                label: 'After (TheSmartPro)',
                data: [500],
                backgroundColor: 'hsl(261, 51%, 63%)',
                borderRadius: 8,
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { size: 13, weight: 600 },
                  padding: 15,
                  usePointStyle: true
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 2000,
                ticks: {
                  callback: function(value) {
                    return '$' + value;
                  },
                  font: { size: 12 }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                }
              },
              y: {
                ticks: {
                  font: { size: 13, weight: 600 }
                }
              }
            }
          }
        };

        comparisonChartInstance.current = new Chart(ctx, config);
      }
    }

    // Cost Breakdown Chart
    if (breakdownChartRef.current) {
      const ctx = breakdownChartRef.current.getContext('2d');
      if (ctx) {
        if (breakdownChartInstance.current) {
          breakdownChartInstance.current.destroy();
        }

        const config: ChartConfiguration = {
          type: 'doughnut',
          data: {
            labels: ['Project Mgmt', 'CRM', 'E-Learning', 'Automation', 'Communication'],
            datasets: [{
              data: [400, 600, 300, 225, 150],
              backgroundColor: [
                'hsl(5, 78%, 70%)',
                'hsl(261, 51%, 63%)',
                'hsl(5, 78%, 80%)',
                'hsl(261, 51%, 73%)',
                'hsl(5, 78%, 85%)'
              ],
              borderColor: '#FFFFFF',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { size: 12, weight: 600 },
                  padding: 15,
                  usePointStyle: true
                }
              }
            }
          }
        };

        breakdownChartInstance.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }
      if (breakdownChartInstance.current) {
        breakdownChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-12">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-border">
          <div className="text-3xl font-bold text-primary mb-2">30-40%</div>
          <div className="text-sm text-muted-foreground">Average Cost Reduction</div>
        </div>
        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-xl border border-border">
          <div className="text-3xl font-bold text-secondary mb-2">5+</div>
          <div className="text-sm text-muted-foreground">Tools Consolidated</div>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-border">
          <div className="text-3xl font-bold text-primary mb-2">181+</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-xl border border-border">
          <div className="text-3xl font-bold text-secondary mb-2">$847</div>
          <div className="text-sm text-muted-foreground">Avg Monthly Savings</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Cost Comparison: Before vs After</h3>
          <div className="h-[300px] mb-4">
            <canvas ref={comparisonChartRef}></canvas>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Average monthly costs for a typical business with 10-50 employees using 5+ separate tools vs TheSmartPro.io
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Cost Breakdown by Tool Category</h3>
          <div className="h-[300px] mb-4">
            <canvas ref={breakdownChartRef}></canvas>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Distribution of costs across different tool categories before consolidation
          </p>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-card rounded-xl overflow-hidden">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Tool Category</th>
              <th className="px-6 py-4 text-left font-semibold">Typical Tools</th>
              <th className="px-6 py-4 text-left font-semibold">Monthly Cost (Before)</th>
              <th className="px-6 py-4 text-left font-semibold">Included in SmartPro</th>
              <th className="px-6 py-4 text-left font-semibold">Monthly Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-semibold">Project Management</td>
              <td className="px-6 py-4 text-muted-foreground">Asana, Monday.com, Jira</td>
              <td className="px-6 py-4 text-secondary font-semibold">$300-500</td>
              <td className="px-6 py-4">✓ Included</td>
              <td className="px-6 py-4 text-green-600 font-semibold">$300-500</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-semibold">CRM & Client Management</td>
              <td className="px-6 py-4 text-muted-foreground">Salesforce, HubSpot, Pipedrive</td>
              <td className="px-6 py-4 text-secondary font-semibold">$400-800</td>
              <td className="px-6 py-4">✓ Included</td>
              <td className="px-6 py-4 text-green-600 font-semibold">$400-800</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-semibold">E-Learning & Training</td>
              <td className="px-6 py-4 text-muted-foreground">Udemy, Coursera, Moodle</td>
              <td className="px-6 py-4 text-secondary font-semibold">$200-400</td>
              <td className="px-6 py-4">✓ Included</td>
              <td className="px-6 py-4 text-green-600 font-semibold">$200-400</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-semibold">Automation & Workflows</td>
              <td className="px-6 py-4 text-muted-foreground">Zapier, Make, IFTTT</td>
              <td className="px-6 py-4 text-secondary font-semibold">$150-300</td>
              <td className="px-6 py-4">✓ Included</td>
              <td className="px-6 py-4 text-green-600 font-semibold">$150-300</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 font-semibold">Communication & Collaboration</td>
              <td className="px-6 py-4 text-muted-foreground">Slack, Teams, Zoom</td>
              <td className="px-6 py-4 text-secondary font-semibold">$100-200</td>
              <td className="px-6 py-4">✓ Included</td>
              <td className="px-6 py-4 text-green-600 font-semibold">$100-200</td>
            </tr>
            <tr className="bg-muted font-semibold">
              <td className="px-6 py-4">TOTAL MONTHLY COST</td>
              <td className="px-6 py-4">5+ Tools</td>
              <td className="px-6 py-4 text-secondary">$1,150-2,200</td>
              <td className="px-6 py-4 text-primary">TheSmartPro.io: $400-600</td>
              <td className="px-6 py-4 text-green-600">$750-1,600</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Data Source */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>
          <strong className="text-foreground">Data Source:</strong> TheSmartPro.io platform analysis based on 181+ active users managing 847 contracts with 12 automated workflows.
        </p>
        <p>
          Cost estimates based on standard pricing for comparable enterprise tools as of 2025. Actual savings may vary based on organization size, tool selection, and usage patterns.
        </p>
      </div>
    </div>
  );
}
