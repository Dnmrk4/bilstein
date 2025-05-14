// app/services/page.tsx
export default function ServicesPage() {
  const services = [
    {
      title: "Engine Diagnostics",
      description:
        "Accurate and fast engine checks with modern diagnostic tools.",
    },
    {
      title: "Brake Repairs",
      description:
        "Complete brake inspections, replacements, and fluid top-ups.",
    },
    {
      title: "Battery Replacement",
      description: "Quick mobile battery replacements at your location.",
    },
    {
      title: "Oil Change",
      description: "High-quality oil and filter changes for all vehicle types.",
    },
    {
      title: "Mobile Tyre Service",
      description:
        "Puncture repair, tyre fitting, and pressure checks on the go.",
    },
  ];

  return (
    <main className="min-h-screen bg-blue-950 text-white px-4 py-16">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
          Our Services
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg transition hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-red-700 mb-2">
                {service.title}
              </h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
