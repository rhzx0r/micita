"use client"

import { useState } from "react"
import {
  Bell,
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para las citas
const upcomingAppointments = [
  {
    id: 1,
    professional: "Dra. María Sánchez",
    specialty: "Médico General",
    date: "2025-05-10",
    time: "10:00",
    status: "confirmed",
    location: "Clínica Central, Consultorio 205",
  },
  {
    id: 2,
    professional: "Dr. Carlos Ruiz",
    specialty: "Dentista",
    date: "2025-05-15",
    time: "16:30",
    status: "pending",
    location: "Centro Médico Norte, Piso 3",
  },
  {
    id: 3,
    professional: "Lic. Ana Gómez",
    specialty: "Abogada",
    date: "2025-05-20",
    time: "11:15",
    status: "confirmed",
    location: "Edificio Legal, Oficina 405",
  },
]

// Datos de ejemplo para el historial
const appointmentHistory = [
  {
    id: 101,
    professional: "Dr. Roberto Méndez",
    specialty: "Cardiólogo",
    date: "2025-04-25",
    time: "09:00",
    status: "completed",
    location: "Hospital Central",
  },
  {
    id: 102,
    professional: "Dra. Laura Torres",
    specialty: "Dermatóloga",
    date: "2025-04-15",
    time: "15:45",
    status: "completed",
    location: "Clínica Dermatológica",
  },
  {
    id: 103,
    professional: "Lic. Juan Pérez",
    specialty: "Abogado",
    date: "2025-04-05",
    time: "12:30",
    status: "cancelled",
    location: "Despacho Jurídico Central",
  },
]

// Función para formatear la fecha
function formatDate(dateString) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Función para avanzar al siguiente mes
  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // Función para retroceder al mes anterior
  const prevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MiCita</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-[200px] rounded-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Juan Pérez</p>
                    <p className="text-xs leading-none text-muted-foreground">juan.perez@ejemplo.com</p>
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
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Nueva cita
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Agendar nueva cita</SheetTitle>
                <SheetDescription>
                  Completa los detalles para agendar una nueva cita con un profesional.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Selecciona un profesional</h3>
                  <Input type="search" placeholder="Buscar profesional..." />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Fecha y hora</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                      </span>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                        <div key={day} className="text-xs font-medium text-muted-foreground p-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 35 }).map((_, i) => (
                        <Button key={i} variant="ghost" className="h-8 w-8 p-0 text-xs">
                          {i + 1 <= 31 ? i + 1 : ""}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Horarios disponibles</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      09:00
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      10:00
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      11:00
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      12:00
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      16:00
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      17:00
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Motivo de la cita</h3>
                  <Input placeholder="Describe brevemente el motivo de tu cita" />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="bg-teal-600 hover:bg-teal-700">Confirmar cita</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximas citas</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{appointment.professional}</CardTitle>
                        <CardDescription>{appointment.specialty}</CardDescription>
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
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time} hrs</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">{appointment.location}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Reprogramar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appointmentHistory.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{appointment.professional}</CardTitle>
                        <CardDescription>{appointment.specialty}</CardDescription>
                      </div>
                      <Badge
                        variant={appointment.status === "completed" ? "default" : "destructive"}
                        className={appointment.status === "completed" ? "bg-green-600" : ""}
                      >
                        {appointment.status === "completed" ? "Completada" : "Cancelada"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time} hrs</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">{appointment.location}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Agendar nueva cita
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
