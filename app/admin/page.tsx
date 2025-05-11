"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CalendarClock,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Home,
  LogOut,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para las citas del día
const todayAppointments = [
  {
    id: 1,
    patient: "Juan Pérez",
    time: "09:00",
    duration: "30 min",
    status: "confirmed",
    reason: "Consulta general",
  },
  {
    id: 2,
    patient: "María López",
    time: "10:00",
    duration: "45 min",
    status: "confirmed",
    reason: "Seguimiento tratamiento",
  },
  {
    id: 3,
    patient: "Carlos Rodríguez",
    time: "11:30",
    duration: "30 min",
    status: "pending",
    reason: "Primera consulta",
  },
  {
    id: 4,
    patient: "Ana Martínez",
    time: "12:30",
    duration: "30 min",
    status: "confirmed",
    reason: "Revisión",
  },
  {
    id: 5,
    patient: "Roberto Sánchez",
    time: "16:00",
    duration: "45 min",
    status: "confirmed",
    reason: "Consulta especializada",
  },
  {
    id: 6,
    patient: "Laura Gómez",
    time: "17:00",
    duration: "30 min",
    status: "pending",
    reason: "Consulta urgente",
  },
]

// Datos de ejemplo para las solicitudes pendientes
const pendingRequests = [
  {
    id: 101,
    patient: "Pedro Fernández",
    requestDate: "2025-05-06",
    preferredDate: "2025-05-12",
    preferredTime: "Mañana",
    reason: "Dolor de espalda crónico",
  },
  {
    id: 102,
    patient: "Sofía Ramírez",
    requestDate: "2025-05-06",
    preferredDate: "2025-05-14",
    preferredTime: "Tarde",
    reason: "Consulta inicial",
  },
  {
    id: 103,
    patient: "Miguel Torres",
    requestDate: "2025-05-05",
    preferredDate: "2025-05-11",
    preferredTime: "Mañana",
    reason: "Seguimiento de tratamiento",
  },
]

export default function AdminPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Función para avanzar al día siguiente
  const nextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  // Función para retroceder al día anterior
  const prevDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  // Función para formatear la fecha
  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <CalendarClock className="h-5 w-5 text-teal-600" />
            <span>MiCita Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Calendar className="h-4 w-4" />
              Calendario
            </Link>
            <Link
              href="/admin/patients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Pacientes
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Informes
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Maria+Sanchez" alt="Avatar" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-sm">
              <div className="font-medium">Dra. María Sánchez</div>
              <div className="text-xs text-muted-foreground">Médico General</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Menú</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <CalendarClock className="h-5 w-5 text-teal-600" />
            <span className="sr-only">Home</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar pacientes..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-medium text-white">
              3
            </span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Maria+Sanchez" alt="@doctor" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dra. María Sánchez</p>
                  <p className="text-xs leading-none text-muted-foreground">m.sanchez@clinica.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Panel de Administración</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={prevDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">{formatDate(currentDate)}</div>
                <Button variant="outline" size="sm" onClick={nextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="today" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="today">Citas de hoy</TabsTrigger>
                <TabsTrigger value="pending">Solicitudes pendientes</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {todayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{appointment.patient}</CardTitle>
                            <CardDescription className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {appointment.time} ({appointment.duration})
                            </CardDescription>
                          </div>
                          <Badge
                            variant={appointment.status === "confirmed" ? "default" : "outline"}
                            className={appointment.status === "confirmed" ? "bg-teal-600" : ""}
                          >
                            {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between bg-muted/50 p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <FileText className="h-3.5 w-3.5" />
                          Detalles
                        </Button>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Aprobar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Rechazar</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{request.patient}</CardTitle>
                            <CardDescription className="flex items-center">
                              <CalendarDays className="mr-1 h-3 w-3" />
                              Solicitud: {new Date(request.requestDate).toLocaleDateString("es-ES")}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">Pendiente</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Fecha preferida: {new Date(request.preferredDate).toLocaleDateString("es-ES")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Horario: {request.preferredTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{request.reason}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Programar
                        </Button>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Aprobar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Rechazar</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Appointment details sheet */}
      {selectedAppointment && (
        <Sheet open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Detalles de la cita</SheetTitle>
              <SheetDescription>Información completa sobre la cita seleccionada</SheetDescription>
            </SheetHeader>
            <div className="py-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Paciente" />
                    <AvatarFallback>{selectedAppointment.patient.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedAppointment.patient}</h3>
                    <p className="text-sm text-muted-foreground">Paciente</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Detalles de la cita</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(currentDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedAppointment.time} ({selectedAppointment.duration})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Motivo de la consulta</h4>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.reason}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Historial del paciente</h4>
                  <p className="text-sm text-muted-foreground">
                    El paciente ha tenido 3 consultas previas. Última visita: 15/03/2025.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Notas</h4>
                  <Input placeholder="Añadir notas sobre esta cita..." />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2">
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <Check className="mr-2 h-4 w-4" />
                  Marcar como completada
                </Button>
                <Button variant="outline" className="flex-1">
                  <Clock className="mr-2 h-4 w-4" />
                  Reprogramar
                </Button>
              </div>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancelar cita
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
