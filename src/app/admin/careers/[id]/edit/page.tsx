import { db } from "@/lib/firebaseAdmin";
import CareerForm from "@/components/CareerForm";
import PageHeader from "@/components/ui/PageHeader";
import { notFound } from "next/navigation";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await db().collection("careers").doc(id).get();

  if (!doc.exists) notFound();

  const data = doc.data()!;

  return (
    <div>
      <PageHeader title="Edit job posting" subtitle="Update the role and save your changes." />
      <CareerForm
        jobId={id}
        initial={{
          title: data.title,
          department: data.department,
          location: data.location,
          type: data.type,
          description: data.description,
          status: data.status,
        }}
      />
    </div>
  );
}
