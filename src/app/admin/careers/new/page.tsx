import CareerForm from "@/components/CareerForm";
import PageHeader from "@/components/ui/PageHeader";

export default function NewCareerPage() {
  return (
    <div>
      <PageHeader title="New job posting" subtitle="Add a new open role to the careers page." />
      <CareerForm />
    </div>
  );
}
