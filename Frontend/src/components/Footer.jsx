function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVybml0dXJlfGVufDB8fDB8fHww')",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-slate-950/70" />

      <div className="container relative z-10 py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm">
                F
              </div>
              <div>
                <p className="text-base font-semibold text-white">Flipr Consulting</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200">
                  Consultation, design, and marketing support for real estate teams—built for clear decisions
                  and execution-ready outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-white">Quick Links</p>
                <div className="mt-4 grid gap-3 text-sm">
                  <a className="text-slate-200 hover:text-white" href="#projects">
                    Our Projects
                  </a>
                  <a className="text-slate-200 hover:text-white" href="#clients">
                    Happy Clients
                  </a>
                  <a className="text-slate-200 hover:text-white" href="#contact">
                    Contact
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Services</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-200">
                  <p>Consultation</p>
                  <p>Design Guidance</p>
                  <p>Marketing Strategy</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Contact</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-200">
                  <p>
                    Email:{' '}
                    <a className="font-medium text-white/90 hover:text-white" href="mailto:hello@flipr.consulting">
                      hello@flipr.consulting
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a className="font-medium text-white/90 hover:text-white" href="tel:+910000000000">
                      +91 7999388296
                    </a>
                  </p>
                  <p className="text-xs text-slate-300">Mon–Sat, 10:00–19:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flipr Consulting. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#clients">
              Clients
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
