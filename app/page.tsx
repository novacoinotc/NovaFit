import Link from "next/link";

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Potenciado por Inteligencia Artificial
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 text-balance">
          Tu plan de nutricion y ejercicio,{" "}
          <span className="text-emerald-600">disenado por IA experta</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance">
          Responde un cuestionario detallado y recibe un plan completo de
          alimentacion, ejercicio y lista de compras adaptado a tu cuerpo, tus
          metas y tu region.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/questionnaire"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl active:scale-[0.98] inline-block"
          >
            Crear mi plan personalizado
          </Link>
          <a
            href="#como-funciona"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-xl text-lg inline-block"
          >
            Como funciona
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "100% Personalizado",
    description:
      "Analiza tu edad, peso, metas, condiciones medicas, preferencias alimenticias y mucho mas para crear un plan unico para ti.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Basado en Ciencia",
    description:
      "La IA utiliza principios de nutricion deportiva y ciencia del ejercicio para calcular tus macronutrientes y rutinas optimas.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: "Plan Completo",
    description:
      "Recibe plan alimenticio semanal, rutina de ejercicios, lista de compras organizada por categoria y tips nutricionales.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Adaptado a tu Region",
    description:
      "Alimentos disponibles en tu pais, con precios accesibles y opciones de tiendas locales. No mas planes con ingredientes imposibles.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas en un solo plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestro sistema de IA considera todos los aspectos de tu vida para
            crear el plan perfecto.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Completa el cuestionario",
    description:
      "Responde preguntas sobre tu cuerpo, salud, metas, alimentacion, ejercicio y estilo de vida. Toma unos 10 minutos.",
  },
  {
    number: "02",
    title: "La IA analiza tu perfil",
    description:
      "Nuestra inteligencia artificial procesa toda tu informacion para calcular tus necesidades caloricas y de macronutrientes.",
  },
  {
    number: "03",
    title: "Recibe tu plan completo",
    description:
      "Obten tu plan alimenticio semanal, rutina de ejercicios, lista de compras y recomendaciones personalizadas al instante.",
  },
];

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Como funciona
          </h2>
          <p className="text-lg text-gray-600">
            Tres simples pasos para transformar tu alimentacion
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-emerald-200" />
              )}
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 bg-emerald-600">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Empieza hoy tu transformacion
        </h2>
        <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
          No mas dietas genericas. Obten un plan disenado exclusivamente para
          ti, con alimentos que te gustan y que puedes encontrar cerca.
        </p>
        <Link
          href="/questionnaire"
          className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl active:scale-[0.98] inline-block"
        >
          Crear mi plan ahora
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">N</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Nova<span className="text-emerald-600">FIT</span>
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {new Date().getFullYear()} NovaFIT. Nutricion inteligente para todos.
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar is rendered globally from layout.tsx */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
