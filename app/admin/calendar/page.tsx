"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Datos de ejemplo para las citas
const appointments = [
  {
    id: 1,
    patient: "Juan Pérez",
    time: "09:00",
    duration: "30 min",
    status: "confirmed",
    reason: "Consulta general",
    date: "2025-05-10",
  },
  {
    id: 2,
    patient: "María López",
    time: "10:00",
    duration: "45 min",
    status: "confirmed",
    reason: "Seguimiento tratamiento",
    date: "2025-05-10",
  },
  {
    id: 3,
    patient: "Carlos Rodríguez",
    time: "11:30",
    duration: "30 min",
    status: "pending",
    reason: "Primera consulta",
    date: "2025-05-10",
  },
  {
    id: 4,
    patient: "Ana Martínez",
    time: "09:30",
    duration: "30 min",
    status: "confirmed",
    reason: "Revisión",
    date: "2025-05-11",
  },
  {
    id: 5,
    patient: "Roberto Sánchez",
    time: "11:00",
    duration: "45 min",
    status: "confirmed",
    reason: "Consulta especializada",
    date: "2025-05-11",
  },
  {
    id: 6,
    patient: "Laura Gómez",
    time: "16:00",
    duration: "30 min",
    status: "pending",
    reason: "Consulta urgente",
    date: "2025-05-12",
  },
  {
    id: 7,
    patient: "Pedro Fernández",
    time: "10:30",
    duration: "45 min",
    status: "confirmed",
    reason: "Seguimiento",
    date: "2025-05-12",
  },
  {
    id: 8,
    patient: "Sofía Ramírez",
    time: "12:00",
    duration: "30 min",
    status: "confirmed",
    reason: "Consulta general",
    date: "2025-05-13",
  },
]

// Función para generar días del mes
const generateDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1)
  const days = []

  // Obtener el primer día del mes
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return days
}

// Función para obtener citas de un día específico
const getAppointmentsForDate = (date) => {
  const dateString = date.toISOString().split("T")[0]
  return appointments.filter((appointment) => appointment.date === dateString)
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")

  // Obtener año y mes actuales
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Días del mes actual
  const daysInMonth = generateDaysInMonth(currentYear, currentMonth)

  // Obtener el primer día de la semana del mes (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Función para avanzar al mes siguiente
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

  // Función para avanzar a la semana siguiente
  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // Función para retroceder a la semana anterior
  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

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

  // Obtener días de la semana actual
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    // Ajustar al inicio de la semana (lunes)
    const day = currentDate.getDay()
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }

    return weekDays
  }

  const weekDays = getWeekDays()

  // Función para formatear la fecha
  const formatDate = (date, format = "long") => {
    if (format === "long") {
      return date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (format === "short") {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
      })
    } else if (format === "weekday") {
      return date.toLocaleDateString("es-ES", {
        weekday: "short",
      })
    }
  }

  // Función para formatear la hora
  const formatTime = (time) => {
    return time
  }

  // Horas de trabajo
  const workHours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ]

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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/calendar"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
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
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
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
                  placeholder="Buscar citas..."
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
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@doctor" />
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Calendario</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={currentView === "month" ? prevMonth : currentView === "week" ? prevWeek : prevDay}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium">
                    {currentView === "month"
                      ? currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                      : currentView === "week"
                        ? `Semana del ${weekDays[0].toLocaleDateString("es-ES", { day: "numeric", month: "short" })} al ${weekDays[6].toLocaleDateString("es-ES", { day: "numeric", month: "short" })}`
                        : formatDate(currentDate)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={currentView === "month" ? nextMonth : currentView === "week" ? nextWeek : nextDay}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Select value={currentView} onValueChange={setCurrentView}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Vista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Mes</SelectItem>
                    <SelectItem value="week">Semana</SelectItem>
                    <SelectItem value="day">Día</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva cita
                </Button>
              </div>
            </div>

            {/* Vista de mes */}
            {currentView === "month" && (
              <div className="rounded-lg border bg-card shadow">
                <div className="grid grid-cols-7 border-b">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 auto-rows-fr">
                  {/* Espacios vacíos para alinear el primer día del mes */}
                  {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="border-b border-r p-2 min-h-[100px]"></div>
                  ))}

                  {/* Días del mes */}
                  {daysInMonth.map((day, index) => {
                    const dayAppointments = getAppointmentsForDate(day)
                    const isToday = day.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={index}
                        className={`border-b border-r p-2 min-h-[100px] ${isToday ? "bg-muted/50" : ""}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${isToday ? "text-teal-600" : ""}`}>
                            {day.getDate()}
                          </span>
                          {dayAppointments.length > 0 && (
                            <Badge className="bg-teal-600">{dayAppointments.length}</Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 3).map((appointment) => (
                            <TooltipProvider key={appointment.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`text-xs truncate rounded px-1 py-0.5 ${
                                      appointment.status === "confirmed"
                                        ? "bg-teal-100 text-teal-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {appointment.time} - {appointment.patient}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs">
                                    <div className="font-medium">{appointment.patient}</div>
                                    <div>
                                      {appointment.time} ({appointment.duration})
                                    </div>
                                    <div>{appointment.reason}</div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          {dayAppointments.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{dayAppointments.length - 3} más
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Vista de semana */}
            {currentView === "week" && (
              <div className="rounded-lg border bg-card shadow">
                <div className="grid grid-cols-8 border-b">
                  <div className="p-2 text-center text-sm font-medium border-r"></div>
                  {weekDays.map((day, index) => {
                    const isToday = day.toDateString() === new Date().toDateString()
                    return (
                      <div key={index} className={`p-2 text-center ${isToday ? "bg-muted/50" : ""}`}>
                        <div className="text-sm font-medium">{formatDate(day, "weekday")}</div>
                        <div className={`text-sm ${isToday ? "text-teal-600 font-medium" : ""}`}>
                          {formatDate(day, "short")}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="grid grid-cols-8">
                  <div className="border-r">
                    {workHours.map((hour) => (
                      <div key={hour} className="h-20 border-b p-1 text-xs text-muted-foreground">
                        {hour}
                      </div>
                    ))}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const dayAppointments = getAppointmentsForDate(day)
                    const isToday = day.toDateString() === new Date().toDateString()

                    return (
                      <div key={dayIndex} className={`relative ${isToday ? "bg-muted/20" : ""}`}>
                        {workHours.map((hour) => (
                          <div key={hour} className="h-20 border-b border-r"></div>
                        ))}

                        {/* Citas */}
                        {dayAppointments.map((appointment) => {
                          // Calcular posición basada en la hora
                          const [hours, minutes] = appointment.time.split(":").map(Number)
                          const startMinutes = hours * 60 + minutes
                          const startOfDay = 8 * 60 // 8:00 AM
                          const topPosition = ((startMinutes - startOfDay) / 60) * 80 // 80px por hora

                          // Calcular altura basada en la duración
                          const durationMinutes = Number.parseInt(appointment.duration)
                          const height = (durationMinutes / 60) * 80

                          return (
                            <div
                              key={appointment.id}
                              className={`absolute left-0 right-0 mx-1 rounded px-2 py-1 text-xs ${
                                appointment.status === "confirmed"
                                  ? "bg-teal-100 text-teal-800 border border-teal-200"
                                  : "bg-gray-100 text-gray-800 border border-gray-200"
                              }`}
                              style={{
                                top: `${topPosition}px`,
                                height: `${height}px`,
                                overflow: "hidden",
                              }}
                            >
                              <div className="font-medium">{appointment.patient}</div>
                              <div className="truncate">{appointment.reason}</div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Vista de día */}
            {currentView === "day" && (
              <div className="rounded-lg border bg-card shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">{formatDate(currentDate)}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr]">
                  <div className="hidden md:block border-r">
                    {workHours.map((hour) => (
                      <div key={hour} className="h-20 border-b p-2 text-sm text-muted-foreground">
                        {hour}
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    {workHours.map((hour, index) => (
                      <div key={hour} className="h-20 border-b p-2 md:p-0">
                        <div className="md:hidden text-sm text-muted-foreground mb-2">{hour}</div>
                      </div>
                    ))}

                    {/* Citas del día */}
                    {getAppointmentsForDate(currentDate).map((appointment) => {
                      // Calcular posición basada en la hora
                      const [hours, minutes] = appointment.time.split(":").map(Number)
                      const startMinutes = hours * 60 + minutes
                      const startOfDay = 8 * 60 // 8:00 AM
                      const topPosition = ((startMinutes - startOfDay) / 60) * 80 // 80px por hora

                      // Calcular altura basada en la duración
                      const durationMinutes = Number.parseInt(appointment.duration)
                      const height = (durationMinutes / 60) * 80

                      return (
                        <div
                          key={appointment.id}
                          className={`absolute left-0 right-0 md:left-2 md:right-2 mx-2 md:mx-0 rounded p-2 ${
                            appointment.status === "confirmed"
                              ? "bg-teal-100 text-teal-800 border border-teal-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                          style={{
                            top: `${topPosition}px`,
                            height: `${height}px`,
                            overflow: "hidden",
                          }}
                        >
                          <div className="font-medium">
                            {appointment.time} - {appointment.patient}
                          </div>
                          <div className="text-sm">{appointment.duration}</div>
                          <div className="text-sm truncate">{appointment.reason}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
