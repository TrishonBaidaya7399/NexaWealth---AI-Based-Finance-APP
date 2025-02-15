import { statsData } from "@/data/landing";

export default function StatsSection() {
  return (
    <section className="py-10 bg-blue-50">
      <div className="stats_data container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData?.map((state, i) => (
            <div
              className="state_card text-center w-full h-[150px] rounded-lg bg-white flex flex-col items-center justify-center"
              key={i}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {state?.value}
              </div>
              <div className="text-gray-600">{state?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
