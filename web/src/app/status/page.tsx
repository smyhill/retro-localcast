import { listLocations } from "@/server/locations/locationRepository";

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  const locations = await getLocations();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-slate-950">Status</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-700">
        A placeholder for future observability and system health details.
      </p>
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-950">
          Saved Locations
        </h2>
        {locations.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {locations.map((location) => (
              <li
                key={location.id}
                className="border border-slate-200 bg-white p-4 text-sm text-slate-700"
              >
                <p className="font-semibold text-slate-950">{location.name}</p>
                <p className="mt-1 font-mono">
                  {location.latitude}, {location.longitude}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-600">
            No saved locations are available yet.
          </p>
        )}
      </section>
    </main>
  );
}

async function getLocations() {
  try {
    return await listLocations();
  } catch {
    return [];
  }
}
