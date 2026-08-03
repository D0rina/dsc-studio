import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export default function Kontakt() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <p className="mono text-xs uppercase tracking-widest text-forest mb-4">
              Kontakt
            </p>
            <h1 className="text-4xl md:text-5xl mb-6">
              Popuni formu, javljam se unutar 24 sata.
            </h1>
            <p className="text-ink-soft text-lg mb-10 max-w-sm">
              Ukratko opiši za što te zanima pomoć — razred, predmet ili
              temu — pa dogovorimo besplatan uvodni razgovor.
            </p>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <p className="mono text-xs uppercase tracking-wide text-forest mb-1">
                  E-mail
                </p>
                <p className="text-ink-soft">info@novaznanja.hr</p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-forest mb-1">
                  Telefon
                </p>
                <p className="text-ink-soft">+385 91 000 0000</p>
              </div>
              <div>
                <p className="mono text-xs uppercase tracking-wide text-forest mb-1">
                  Područje rada
                </p>
                <p className="text-ink-soft">Rijeka i online, cijela Hrvatska</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
