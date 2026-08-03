import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BookingCalendar } from "@/components/BookingCalendar";

export default function Termini() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
            Termini
          </p>
          <h1 className="text-4xl md:text-5xl max-w-2xl mb-4">
            Odaberi termin koji ti odgovara.
          </h1>
          <p className="text-ink-soft max-w-xl text-lg">
            Klikni na slobodan termin i pošalji zahtjev. Termin postaje
            rezerviran tek kad ga potvrdim — obično unutar 24 sata.
          </p>
        </section>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <BookingCalendar />
        </section>
      </main>
      <Footer />
    </>
  );
}
