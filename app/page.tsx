import Link from "next/link";
import { CalendarClock, CheckCircle, Clock, Shield } from "lucide-react";
import { LogoCarousel } from "@/components/logo-carousel";
import { Button } from "@/components/ui/button";
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MiCita</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Características
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonios
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Precios
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="default"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
              >
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="bg-muted pt-12 pb-10">
        <section
          id="hero"
          className="container mx-auto max-w-5xl grid items-center gap-6  md:py-10 "
        >
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center">
            <div className="flex flex-col max-w-[980px] gap-4 md:text-left">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                Gestiona tus citas de forma{" "}
                <span className="text-teal-600">simple y eficiente</span>
              </h1>
              <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                Optimiza tu tiempo y el de tus clientes con nuestro sistema de
                citas intuitivo y profesional.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Comenzar ahora
                  </Button>
                </Link>
                {/* <Link href="#demo">
          <Button variant="outline" size="lg">
            Ver demostración
          </Button>
        </Link> */}
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
              <Image
                src="/people.png" // Cambia esto por tu imagen
                alt="Imagen Hero"
                width={500} // Ajusta según necesites
                height={500} // Ajusta según necesites
                className="object-contain w-full rounded-3xl"
              />
            </div>
          </div>
        </section>

        </div>
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Características diseñadas para profesionales
              </h2>
              <ul className="mt-6 grid gap-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-teal-600" />
                  <div>
                    <h3 className="font-semibold">
                      Gestión de citas simplificada
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Administra todas tus citas desde un solo lugar con nuestro
                      intuitivo panel de control.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-teal-600" />
                  <div>
                    <h3 className="font-semibold">Recordatorios automáticos</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce las ausencias con recordatorios automáticos por
                      correo electrónico y SMS.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-teal-600" />
                  <div>
                    <h3 className="font-semibold">Personalización completa</h3>
                    <p className="text-sm text-muted-foreground">
                      Adapta el sistema a tus necesidades específicas y flujo de
                      trabajo.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 rounded-md bg-muted p-4">
                  <Clock className="h-8 w-8 text-teal-600" />
                  <div>
                    <h3 className="font-semibold">Ahorra tiempo</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatiza la programación y reduce el trabajo
                      administrativo.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-md bg-muted p-4">
                  <Shield className="h-8 w-8 text-teal-600" />
                  <div>
                    <h3 className="font-semibold">Seguridad garantizada</h3>
                    <p className="text-sm text-muted-foreground">
                      Protección de datos y cumplimiento con normativas de
                      privacidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Únete a miles de profesionales que confían en nosotros
              </h2>
              <p className="mt-4 text-muted-foreground">
                Médicos, dentistas, abogados y muchos otros profesionales ya
                optimizan su agenda con MiCita.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">M</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Dra. María Sánchez</h3>
                      <p className="text-xs text-muted-foreground">
                        Médico General
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "Ha transformado mi consulta. Mis pacientes valoran la
                    facilidad para agendar citas y yo puedo organizar mejor mi
                    tiempo."
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">J</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Juan Martínez</h3>
                      <p className="text-xs text-muted-foreground">Abogado</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "Desde que uso MiCita, las cancelaciones de última hora se
                    han reducido significativamente. Una herramienta
                    indispensable."
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-bold">L</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Laura Gómez</h3>
                      <p className="text-xs text-muted-foreground">Dentista</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "La interfaz es intuitiva tanto para mi equipo como para mis
                    pacientes. Ha mejorado notablemente nuestra eficiencia."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <LogoCarousel /> */}

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comienza a optimizar tu agenda hoy
            </h2>
            <p className="max-w-[85%] text-muted-foreground">
              Regístrate ahora y descubre cómo MiCita puede transformar la
              gestión de tu agenda profesional.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Comenzar ahora
                </Button>
              </Link>
              {/* <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contactar con ventas
                </Button>
              </Link> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-teal-600" />
            <span className="font-semibold">MiCita</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 MiCita. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
