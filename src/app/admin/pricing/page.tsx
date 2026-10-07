import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';

const mockPlans = [
  { id: 1, name: 'Starter', price: '$49/mo', features: ['Up to 5 agents', 'Basic analytics', 'Community support'] },
  { id: 2, name: 'Pro', price: '$199/mo', features: ['Unlimited agents', 'Advanced telemetry', 'Priority support'] },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Pricing Management" />
        <Button variant="primary">Add New Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <div key={plan.id} className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="font-mono text-lg text-muted">{plan.price}</div>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <div className="flex gap-2 mt-auto pt-4 border-t border-border">
              <Button variant="secondary" className="w-full">Edit</Button>
              <Button variant="danger" className="w-full">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
