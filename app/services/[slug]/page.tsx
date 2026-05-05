import { servicesContent } from "@/src/constants/content";
import { notFound } from "next/navigation";
import ServiceDetailClient from "@/src/components/ServiceDetailClient";

export async function generateStaticParams() {
  return servicesContent.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesContent.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
