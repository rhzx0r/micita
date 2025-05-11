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
  Filter,
  Home,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para los pacientes
const patients = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "+34 612 345 678",
    lastVisit: "2025-04-15",
    nextVisit: "2025-05-20",
    status: "active",
    appointments: 8,
  },
  {
    id: 2,
    name: "María López",
    email: "maria.lopez@ejemplo.com",
    phone: "+34 623 456 789",
    lastVisit: "2025-04-28",
    nextVisit: "2025-05-15",
    status: "active",
    appointments: 5,
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    phone: "+34 634 567 890",
    lastVisit: "2025-03-10",
    nextVisit: "2025-06-05",
    status: "inactive",
    appointments: 3,
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    phone: "+34 645 678 901",
    lastVisit: "2025-04-05",
    nextVisit: "2025-05-10",
    status: "active",
    appointments: 12,
  },
  {
    id: 5,
    name: "Roberto Sánchez",
    email: "roberto.sanchez@ejemplo.com",
    phone: "+34 656 789 012",
    lastVisit: "2025-02-20",
    nextVisit: null,
    status: "inactive",
    appointments: 2,
  },
  {
    id: 6,
    name: "Laura Gómez",
    email: "laura.gomez@ejemplo.com",
    phone: "+34 667 890 123",
    lastVisit: "2025-04-30",
    nextVisit: "2025-05-30",
    status: "active",
    appointments: 7,
  },
  {
    id: 7,
    name: "Pedro Fernández",
    email: "pedro.fernandez@ejemplo.com",
    phone: "+34 678 901 234",
    lastVisit: "2025-03-25",
    nextVisit: "2025-05-25",
    status: "active",
    appointments: 4,
  },
  {
    id: 8,
    name: "Sofía Ramírez",
    email: "sofia.ramirez@ejemplo.com",
    phone: "+34 689 012 345",
    lastVisit: "2025-01-15",
    nextVisit: null,
    status: "inactive",
    appointments: 1,
  },
]

// Función para formatear la fecha
const formatDate = (dateString) => {
  if (!dateString) return "No programada"
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [viewMode, setViewMode] = useState("table")

  // Filtrar pacientes según el término de búsqueda
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

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
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
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
                  placeholder="Buscar pacientes..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo paciente
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir nuevo paciente</DialogTitle>
                      <DialogDescription>
                        Complete la información del nuevo paciente. Todos los campos marcados con * son obligatorios.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Nombre *</Label>
                          <Input id="first-name" placeholder="Nombre" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Apellidos *</Label>
                          <Input id="last-name" placeholder="Apellidos" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico *</Label>
                        <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input id="phone" placeholder="+34 600 000 000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" placeholder="Dirección completa" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          El paciente ha aceptado los términos y condiciones de uso
                        </Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-teal-600 hover:bg-teal-700">Guardar paciente</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    className={viewMode === "table" ? "bg-teal-600 hover:bg-teal-700" : ""}
                    onClick={() => setViewMode("table")}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="sm"
                    className={viewMode === "cards" ? "bg-teal-600 hover:bg-teal-700" : ""}
                    onClick={() => setViewMode("cards")}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Vista de tabla */}
            {viewMode === "table" && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nombre</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Última visita</TableHead>
                      <TableHead>Próxima visita</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{patient.email}</span>
                            <span className="text-xs text-muted-foreground">{patient.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                        <TableCell>{formatDate(patient.nextVisit)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={patient.status === "active" ? "default" : "outline"}
                            className={patient.status === "active" ? "bg-teal-600" : ""}
                          >
                            {patient.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedPatient(patient)}>
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Agendar cita</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Vista de tarjetas */}
            {viewMode === "cards" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{patient.name}</CardTitle>
                            <CardDescription>{patient.email}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={patient.status === "active" ? "default" : "outline"}
                          className={patient.status === "active" ? "bg-teal-600" : ""}
                        >
                          {patient.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Teléfono:</span>
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última visita:</span>
                          <span>{formatDate(patient.lastVisit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Próxima visita:</span>
                          <span>{formatDate(patient.nextVisit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total citas:</span>
                          <span>{patient.appointments}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                        Ver detalles
                      </Button>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        Agendar cita
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Detalles del paciente */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del paciente</DialogTitle>
              <DialogDescription>Información completa del paciente y su historial de citas.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={selectedPatient.name} />
                  <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                </div>
                <Badge
                  variant={selectedPatient.status === "active" ? "default" : "outline"}
                  className={`ml-auto ${selectedPatient.status === "active" ? "bg-teal-600" : ""}`}
                >
                  {selectedPatient.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="appointments">Citas</TabsTrigger>
                  <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dirección</p>
                      <p className="text-sm text-muted-foreground">Calle Ejemplo 123, 28001 Madrid</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Fecha de nacimiento</p>
                      <p className="text-sm text-muted-foreground">15/05/1985</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Género</p>
                      <p className="text-sm text-muted-foreground">Masculino</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Seguro médico</p>
                      <p className="text-sm text-muted-foreground">Compañía Seguros S.A.</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Notas</p>
                    <p className="text-sm text-muted-foreground">
                      Paciente con historial de hipertensión. Alérgico a la penicilina.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="appointments" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Próximas citas</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3 w-3" />
                        Nueva cita
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{formatDate(selectedPatient.nextVisit)}</TableCell>
                            <TableCell>10:00</TableCell>
                            <TableCell>Consulta general</TableCell>
                            <TableCell>
                              <Badge className="bg-teal-600">Confirmada</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <h4 className="text-sm font-medium mt-6">Historial de citas</h4>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Motivo</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{formatDate(selectedPatient.lastVisit)}</TableCell>
                            <TableCell>11:30</TableCell>
                            <TableCell>Revisión</TableCell>
                            <TableCell>
                              <Badge variant="outline">Completada</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>15 mar 2025</TableCell>
                            <TableCell>09:15</TableCell>
                            <TableCell>Consulta urgente</TableCell>
                            <TableCell>
                              <Badge variant="outline">Completada</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Historial médico</h4>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">Consulta general</h5>
                            <p className="text-sm text-muted-foreground">{formatDate(selectedPatient.lastVisit)}</p>
                          </div>
                          <Badge variant="outline">Completada</Badge>
                        </div>
                        <p className="text-sm">
                          Paciente acude a revisión de rutina. Presión arterial: 120/80. Peso: 75kg. Se recomienda
                          mantener dieta baja en sodio y ejercicio regular.
                        </p>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">Consulta urgente</h5>
                            <p className="text-sm text-muted-foreground">15 mar 2025</p>
                          </div>
                          <Badge variant="outline">Completada</Badge>
                        </div>
                        <p className="text-sm">
                          Paciente acude por dolor abdominal agudo. Se diagnostica gastroenteritis. Se prescribe
                          tratamiento sintomático y dieta blanda.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar historial
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Editar paciente</Button>
                <Button className="bg-teal-600 hover:bg-teal-700">Agendar cita</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
