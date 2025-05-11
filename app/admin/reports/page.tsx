"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CalendarClock,
  ChevronRight,
  Download,
  FileText,
  Home,
  LogOut,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para los informes
const monthlyAppointments = [
  { month: "Ene", count: 45 },
  { month: "Feb", count: 52 },
  { month: "Mar", count: 49 },
  { month: "Abr", count: 62 },
  { month: "May", count: 58 },
  { month: "Jun", count: 65 },
  { month: "Jul", count: 68 },
  { month: "Ago", count: 57 },
  { month: "Sep", count: 63 },
  { month: "Oct", count: 59 },
  { month: "Nov", count: 54 },
  { month: "Dic", count: 48 },
]

const appointmentTypes = [
  { type: "Consulta general", count: 120, percentage: 40 },
  { type: "Seguimiento", count: 75, percentage: 25 },
  { type: "Primera visita", count: 45, percentage: 15 },
  { type: "Urgencia", count: 30, percentage: 10 },
  { type: "Otros", count: 30, percentage: 10 },
]

const appointmentStatus = [
  { status: "Completada", count: 180, percentage: 60 },
  { status: "Cancelada", count: 45, percentage: 15 },
  { status: "Reprogramada", count: 60, percentage: 20 },
  { status: "No asistió", count: 15, percentage: 5 },
]

// Función para generar datos de gráfico de barras
const generateBarChartData = (data) => {
  const maxValue = Math.max(...data.map((item) => item.count))

  return data.map((item) => ({
    ...item,
    height: `${(item.count / maxValue) * 100}%`,
  }))
}

// Función para generar datos de gráfico circular
const generatePieChartData = (data) => {
  let cumulativePercentage = 0

  return data.map((item) => {
    const startPercentage = cumulativePercentage
    cumulativePercentage += item.percentage

    return {
      ...item,
      startPercentage,
      endPercentage: cumulativePercentage,
    }
  })
}

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [reportType, setReportType] = useState("appointments")

  // Generar datos para gráficos
  const barChartData = generateBarChartData(monthlyAppointments)
  const appointmentTypesPieData = generatePieChartData(appointmentTypes)
  const appointmentStatusPieData = generatePieChartData(appointmentStatus)

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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
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
                  placeholder="Buscar informes..."
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
              <h1 className="text-2xl font-bold tracking-tight">Informes</h1>
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Este mes</SelectItem>
                    <SelectItem value="quarter">Este trimestre</SelectItem>
                    <SelectItem value="year">Este año</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Resumen de estadísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de citas</CardTitle>
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">300</div>
                  <p className="text-xs text-muted-foreground">+12% respecto al periodo anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Citas completadas</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">180</div>
                  <p className="text-xs text-muted-foreground">60% del total de citas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nuevos pacientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+8% respecto al periodo anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de asistencia</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">+2% respecto al periodo anterior</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="appointments" className="w-full" value={reportType} onValueChange={setReportType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appointments">Citas</TabsTrigger>
                <TabsTrigger value="patients">Pacientes</TabsTrigger>
                <TabsTrigger value="revenue">Ingresos</TabsTrigger>
              </TabsList>

              {/* Informe de citas */}
              <TabsContent value="appointments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Gráfico de barras - Citas por mes */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Citas por mes</CardTitle>
                      <CardDescription>Distribución de citas a lo largo del año</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <div className="flex h-full items-end gap-2">
                          {barChartData.map((item, index) => (
                            <div key={index} className="relative flex h-full w-full flex-col justify-end">
                              <div
                                className="w-full rounded-md bg-teal-600 transition-all"
                                style={{ height: item.height }}
                              ></div>
                              <span className="mt-1 text-center text-xs">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico circular - Tipos de citas */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Tipos de citas</CardTitle>
                      <CardDescription>Distribución por tipo de consulta</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center">
                        <div className="relative h-[200px] w-[200px]">
                          <svg width="100%" height="100%" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20" />
                            {appointmentTypesPieData.map((item, index) => (
                              <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={
                                  index === 0
                                    ? "#0d9488"
                                    : index === 1
                                      ? "#14b8a6"
                                      : index === 2
                                        ? "#2dd4bf"
                                        : "#5eead4"
                                }
                                strokeWidth="20"
                                strokeDasharray={`${item.percentage} 100`}
                                strokeDashoffset={`${-item.startPercentage}`}
                                transform="rotate(-90 50 50)"
                              />
                            ))}
                          </svg>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {appointmentTypes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{
                                backgroundColor:
                                  index === 0
                                    ? "#0d9488"
                                    : index === 1
                                      ? "#14b8a6"
                                      : index === 2
                                        ? "#2dd4bf"
                                        : "#5eead4",
                              }}
                            ></div>
                            <span className="text-xs">
                              {item.type} ({item.percentage}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico circular - Estado de citas */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Estado de citas</CardTitle>
                      <CardDescription>Distribución por estado final</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center">
                        <div className="relative h-[200px] w-[200px]">
                          <svg width="100%" height="100%" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20" />
                            {appointmentStatusPieData.map((item, index) => (
                              <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={
                                  index === 0
                                    ? "#0d9488"
                                    : index === 1
                                      ? "#ef4444"
                                      : index === 2
                                        ? "#f59e0b"
                                        : "#6b7280"
                                }
                                strokeWidth="20"
                                strokeDasharray={`${item.percentage} 100`}
                                strokeDashoffset={`${-item.startPercentage}`}
                                transform="rotate(-90 50 50)"
                              />
                            ))}
                          </svg>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {appointmentStatus.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{
                                backgroundColor:
                                  index === 0
                                    ? "#0d9488"
                                    : index === 1
                                      ? "#ef4444"
                                      : index === 2
                                        ? "#f59e0b"
                                        : "#6b7280",
                              }}
                            ></div>
                            <span className="text-xs">
                              {item.status} ({item.percentage}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tabla de resumen */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Resumen de citas</CardTitle>
                      <CardDescription>Estadísticas detalladas del periodo</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Citas totales</Label>
                            <div className="text-2xl font-bold">300</div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Promedio diario</Label>
                            <div className="text-2xl font-bold">12.5</div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Duración promedio</Label>
                            <div className="text-2xl font-bold">35 min</div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Tasa de cancelación</Label>
                            <div className="text-2xl font-bold">15%</div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label className="text-xs">Día más ocupado</Label>
                          <div className="flex justify-between">
                            <span>Martes</span>
                            <span className="font-medium">25%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "25%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Hora más solicitada</Label>
                          <div className="flex justify-between">
                            <span>10:00 - 11:00</span>
                            <span className="font-medium">18%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "18%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Informe de pacientes */}
              <TabsContent value="patients" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Nuevos pacientes</CardTitle>
                      <CardDescription>Registro de nuevos pacientes por mes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <div className="flex h-full items-end gap-2">
                          {[
                            { month: "Ene", count: 8 },
                            { month: "Feb", count: 12 },
                            { month: "Mar", count: 10 },
                            { month: "Abr", count: 15 },
                            { month: "May", count: 9 },
                            { month: "Jun", count: 14 },
                            { month: "Jul", count: 11 },
                            { month: "Ago", count: 7 },
                            { month: "Sep", count: 13 },
                            { month: "Oct", count: 10 },
                            { month: "Nov", count: 8 },
                            { month: "Dic", count: 6 },
                          ].map((item, index) => (
                            <div key={index} className="relative flex h-full w-full flex-col justify-end">
                              <div
                                className="w-full rounded-md bg-teal-600 transition-all"
                                style={{ height: `${(item.count / 15) * 100}%` }}
                              ></div>
                              <span className="mt-1 text-center text-xs">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Demografía de pacientes</CardTitle>
                      <CardDescription>Distribución por edad y género</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Distribución por género</Label>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Femenino</span>
                                <span>58%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div className="h-2 rounded-full bg-teal-600" style={{ width: "58%" }}></div>
                              </div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Masculino</span>
                                <span>42%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div className="h-2 rounded-full bg-teal-600" style={{ width: "42%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Distribución por edad</Label>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>0-18 años</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-600" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>19-35 años</span>
                              <span>32%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-600" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>36-50 años</span>
                              <span>28%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-600" style={{ width: "28%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>51-65 años</span>
                              <span>18%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-600" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>65+ años</span>
                              <span>7%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-teal-600" style={{ width: "7%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Informe de ingresos */}
              <TabsContent value="revenue" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Ingresos mensuales</CardTitle>
                      <CardDescription>Ingresos totales por mes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <div className="flex h-full items-end gap-2">
                          {[
                            { month: "Ene", amount: 4500 },
                            { month: "Feb", amount: 5200 },
                            { month: "Mar", amount: 4900 },
                            { month: "Abr", amount: 6200 },
                            { month: "May", amount: 5800 },
                            { month: "Jun", amount: 6500 },
                            { month: "Jul", amount: 6800 },
                            { month: "Ago", amount: 5700 },
                            { month: "Sep", amount: 6300 },
                            { month: "Oct", amount: 5900 },
                            { month: "Nov", amount: 5400 },
                            { month: "Dic", amount: 4800 },
                          ].map((item, index) => (
                            <div key={index} className="relative flex h-full w-full flex-col justify-end">
                              <div
                                className="w-full rounded-md bg-teal-600 transition-all"
                                style={{ height: `${(item.amount / 6800) * 100}%` }}
                              ></div>
                              <span className="mt-1 text-center text-xs">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Distribución de ingresos</CardTitle>
                      <CardDescription>Ingresos por tipo de servicio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Consultas generales</Label>
                          <div className="flex justify-between text-xs">
                            <span>€36,000</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Consultas especializadas</Label>
                          <div className="flex justify-between text-xs">
                            <span>€24,000</span>
                            <span>30%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Procedimientos</Label>
                          <div className="flex justify-between text-xs">
                            <span>€12,000</span>
                            <span>15%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Otros servicios</Label>
                          <div className="flex justify-between text-xs">
                            <span>€8,000</span>
                            <span>10%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-teal-600" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Resumen financiero</CardTitle>
                      <CardDescription>Resumen de ingresos, gastos y beneficios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Ingresos totales</Label>
                          <div className="text-2xl font-bold">€80,000</div>
                          <div className="flex items-center text-xs text-green-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="mr-1 h-3 w-3"
                            >
                              <path d="m6 9 6-6 6 6" />
                              <path d="M6 12h12" />
                              <path d="m6 15 6 6 6-6" />
                            </svg>
                            <span>+12% respecto al periodo anterior</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Gastos operativos</Label>
                          <div className="text-2xl font-bold">€48,000</div>
                          <div className="flex items-center text-xs text-red-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="mr-1 h-3 w-3"
                            >
                              <path d="m6 9 6-6 6 6" />
                              <path d="M6 12h12" />
                              <path d="m6 15 6 6 6-6" />
                            </svg>
                            <span>+5% respecto al periodo anterior</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Beneficio neto</Label>
                          <div className="text-2xl font-bold">€32,000</div>
                          <div className="flex items-center text-xs text-green-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="mr-1 h-3 w-3"
                            >
                              <path d="m6 9 6-6 6 6" />
                              <path d="M6 12h12" />
                              <path d="m6 15 6 6 6-6" />
                            </svg>
                            <span>+24% respecto al periodo anterior</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
