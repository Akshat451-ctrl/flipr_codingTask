function HeroSection() {
  const bannerImageUrl =
    'https://get.fohlio.com/hubfs/How-to-Manage-Interior-Design-Options-With-Minimum-Wasted-Hours-Fohlio-FFE-specification-software-cover.jpg'

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-35 sm:h-[38rem]"
        style={{
          backgroundImage: `url('${bannerImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-white/85 sm:h-[38rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[26rem] -z-10 h-56 bg-gradient-to-b from-white to-white sm:top-[30rem]"
      />
      <div className="container relative z-10 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-900">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${bannerImageUrl}')` }}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-slate-950/80" />
              <div className="absolute inset-0 opacity-25">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-400 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-400 blur-3xl" />
              </div>
              <div className="relative z-10 p-7 sm:p-10">
                <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
                  Consultation • Design • Marketing
                </p>
                <h1 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Consultation, design & marketing for real estate.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  We help teams make confident decisions and deliver projects that sell—using market research,
                  structured planning, and execution-ready guidance.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="#contact" className="primary-button">
                    Get Free Consultation
                  </a>
                  <a href="#projects" className="secondary-button border-white/25 bg-white/10 text-white hover:bg-white/15">
                    View Projects
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-emerald-50 blur-2xl" />
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Get Free Consultation</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Share your details and we’ll call you back.
                  </p>
                </div>

                <form className="mt-6 grid gap-4" action="#contact">
                  <div>
                    <label className="field-label" htmlFor="heroName">
                      Full name
                    </label>
                    <input id="heroName" className="field-input" placeholder="Your name" />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="heroEmail">
                      Email
                    </label>
                    <input id="heroEmail" type="email" className="field-input" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="heroPhone">
                      Phone
                    </label>
                    <input id="heroPhone" className="field-input" placeholder="Your mobile number" />
                  </div>

                  <button type="submit" className="primary-button w-full">
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 pb-14 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <section
            id="services"
            aria-label="Why choose us"
            className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
          >
            <h2 className="section-title">Why choose us</h2>
            <p className="section-subtitle">
              Practical consulting—built for teams that want clarity, not noise.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Market-first thinking</p>
                <p className="mt-1 text-sm text-slate-600">
                  Research-led decisions with demand, pricing, and supply context.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Numbers you can trust</p>
                <p className="mt-1 text-sm text-slate-600">
                  Clear assumptions, clean models, and measurable outcomes.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Execution-ready strategy</p>
                <p className="mt-1 text-sm text-slate-600">
                  Actionable steps that work with your team’s constraints.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Stakeholder alignment</p>
                <p className="mt-1 text-sm text-slate-600">
                  Keep owners, investors, and teams moving in the same direction.
                </p>
              </div>
            </div>
          </section>

          <section aria-label="About us" className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="section-title">About us</h2>
            <p className="section-subtitle">
              We’re a small team that blends on-ground insights with structured analysis.
            </p>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Our work spans residential, mixed-use, and plotted developments. We help you define the
                right product, validate pricing, plan execution, and communicate the story to stakeholders.
              </p>
              <p>
                Whether you’re exploring a new site or improving an existing plan, we focus on clarity:
                what to build, who it’s for, and what success looks like.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">Typical deliverables</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Feasibility note, pricing strategy, execution plan, investor deck review.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">Working style</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Short cycles, crisp outputs, and decision-ready recommendations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
