const PROFILE_FIELDS = [
  { label: "Name", value: "Ada Lovelace" },
  { label: "Email", value: "ada@example.com" },
  { label: "Role", value: "Product Engineer" },
  { label: "Timezone", value: "UTC+1" },
];

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">Account</p>
          <h1 className="text-4xl font-bold text-primary mt-1">Profile</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="col-span-1 rounded-3xl border border-gray-300 bg-[var(--background)] text-[var(--foreground)] shadow-sm p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-contrast flex items-center justify-center text-xl font-semibold">
            AL
          </div>
          <div>
            <p className="text-lg font-semibold text-primary">Ada Lovelace</p>
            <p className="text-sm text-secondary">ada@example.com</p>
            <p className="text-sm text-[var(--foreground)]/70 mt-1">
              Engineering · London
            </p>
          </div>
        </section>

        <section className="col-span-1 lg:col-span-2 rounded-3xl border border-gray-300 bg-[var(--background)] text-[var(--foreground)] shadow-sm p-6">
          <h2 className="text-xl font-semibold text-primary">
            Profile details
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROFILE_FIELDS.map((field) => (
              <div
                key={field.label}
                className="rounded-2xl border border-gray-200 bg-secondary/20 p-4"
              >
                <p className="text-xs uppercase tracking-wide text-secondary">
                  {field.label}
                </p>
                <p className="text-base font-medium text-[var(--foreground)] mt-1">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-gray-300 bg-[var(--background)] text-[var(--foreground)] shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Theme preview</h2>
        </div>
        <p className="mt-2 text-secondary">
          Foreground uses{" "}
          <span className="font-semibold">var(--foreground)</span>, background
          uses <span className="font-semibold">var(--background)</span>.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl p-4 bg-primary text-primary-contrast">
            Primary sample
          </div>
          <div className="rounded-2xl p-4 bg-secondary text-secondary-contrast">
            Secondary sample
          </div>
          <div className="rounded-2xl p-4 border border-gray-200 bg-[var(--background)] text-[var(--foreground)]">
            Neutral surface
          </div>
        </div>
      </section>
    </div>
  );
}
