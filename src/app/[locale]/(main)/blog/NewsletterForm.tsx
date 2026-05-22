"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="vas@email.cz"
        className="flex-1 px-4 py-3 rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors whitespace-nowrap"
      >
        Přihlásit se
      </button>
    </form>
  );
}
