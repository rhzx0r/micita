"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CalendarClock,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Mail,
  Save,
  Search,
  Settings,
  Smartphone,
  User,
  Users,
  Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [workingHours, setWorkingHours] = useState({
    monday: { start: "09:00", end: "18:00", enabled: true },
    tuesday: { start: "09:00", end: "18:00", enabled: true },
    wednesday: { start: "09:00", end: "18:00", enabled: true },
    thursday: { start: "09:00", end: "18:00", enabled: true },
    friday: { start: "09:00", end: "18:00", enabled: true },
    saturday: { start: "10:00", end: "14:00", enabled: false },
    sunday: { start: "10:00", end: "14:00", enabled: false },
  })

  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Informes
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
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
                  placeholder="Buscar configuración..."
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
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
              <p className="text-muted-foreground">
                Administra la configuración de tu cuenta y preferencias del sistema.
              </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <div className="flex justify-between">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="schedule">Horarios</TabsTrigger>
                  <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                  <TabsTrigger value="account">Cuenta</TabsTrigger>
                </TabsList>
              </div>

              {/* Configuración general */}
              <TabsContent value="general" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del profesional</CardTitle>
                    <CardDescription>Esta información se mostrará a los pacientes al agendar citas.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" defaultValue="Dra. María Sánchez" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Especialidad</Label>
                        <Input id="specialty" defaultValue="Médico General" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" defaultValue="m.sanchez@clinica.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" defaultValue="+34 612 345 678" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía profesional</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Médico general con más de 10 años de experiencia en atención primaria. Especializada en medicina preventiva y atención integral."
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">Esta descripción aparecerá en tu perfil público.</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de citas</CardTitle>
                    <CardDescription>Personaliza cómo se gestionan las citas en tu agenda.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="appointment-duration">Duración predeterminada de citas</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="appointment-duration">
                            <SelectValue placeholder="Seleccionar duración" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutos</SelectItem>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="60">60 minutos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="buffer-time">Tiempo entre citas</Label>
                        <Select defaultValue="10">
                          <SelectTrigger id="buffer-time">
                            <SelectValue placeholder="Seleccionar tiempo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Sin tiempo</SelectItem>
                            <SelectItem value="5">5 minutos</SelectItem>
                            <SelectItem value="10">10 minutos</SelectItem>
                            <SelectItem value="15">15 minutos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Opciones de citas</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-confirm" defaultChecked />
                          <Label htmlFor="auto-confirm" className="text-sm font-normal">
                            Confirmar automáticamente las citas nuevas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="allow-cancel" defaultChecked />
                          <Label htmlFor="allow-cancel" className="text-sm font-normal">
                            Permitir a los pacientes cancelar citas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="allow-reschedule" defaultChecked />
                          <Label htmlFor="allow-reschedule" className="text-sm font-normal">
                            Permitir a los pacientes reprogramar citas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="limit-advance" />
                          <Label htmlFor="limit-advance" className="text-sm font-normal">
                            Limitar citas con más de 30 días de antelación
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Configuración de horarios */}
              <TabsContent value="schedule" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Horario de trabajo</CardTitle>
                    <CardDescription>Configura tus horas de disponibilidad para citas.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-28">
                          <Label className="text-sm capitalize">{day}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={hours.enabled}
                            onCheckedChange={(checked) => handleWorkingHoursChange(day, "enabled", checked)}
                          />
                          <span className="text-sm text-muted-foreground">
                            {hours.enabled ? "Disponible" : "No disponible"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Select
                            value={hours.start}
                            onValueChange={(value) => handleWorkingHoursChange(day, "start", value)}
                            disabled={!hours.enabled}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Inicio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="08:00">08:00</SelectItem>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="10:00">10:00</SelectItem>
                              <SelectItem value="11:00">11:00</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm">a</span>
                          <Select
                            value={hours.end}
                            onValueChange={(value) => handleWorkingHoursChange(day, "end", value)}
                            disabled={!hours.enabled}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Fin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="14:00">14:00</SelectItem>
                              <SelectItem value="15:00">15:00</SelectItem>
                              <SelectItem value="16:00">16:00</SelectItem>
                              <SelectItem value="17:00">17:00</SelectItem>
                              <SelectItem value="18:00">18:00</SelectItem>
                              <SelectItem value="19:00">19:00</SelectItem>
                              <SelectItem value="20:00">20:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Restablecer horario predeterminado</Button>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Periodos de ausencia</CardTitle>
                    <CardDescription>Configura periodos en los que no estarás disponible para citas.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">Vacaciones de verano</h4>
                          <p className="text-sm text-muted-foreground">1 ago 2025 - 15 ago 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">Congreso médico</h4>
                          <p className="text-sm text-muted-foreground">10 oct 2025 - 12 oct 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Añadir periodo de ausencia
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Configuración de notificaciones */}
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de notificaciones</CardTitle>
                    <CardDescription>Configura cómo y cuándo quieres recibir notificaciones.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notificaciones por correo electrónico</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-new-appointment" defaultChecked />
                            <Label htmlFor="email-new-appointment" className="text-sm font-normal">
                              Nuevas citas
                            </Label>
                          </div>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-cancelled" defaultChecked />
                            <Label htmlFor="email-cancelled" className="text-sm font-normal">
                              Citas canceladas
                            </Label>
                          </div>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-rescheduled" defaultChecked />
                            <Label htmlFor="email-rescheduled" className="text-sm font-normal">
                              Citas reprogramadas
                            </Label>
                          </div>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email-reminder" defaultChecked />
                            <Label htmlFor="email-reminder" className="text-sm font-normal">
                              Recordatorios diarios
                            </Label>
                          </div>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notificaciones por SMS</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms-new-appointment" />
                            <Label htmlFor="sms-new-appointment" className="text-sm font-normal">
                              Nuevas citas
                            </Label>
                          </div>
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms-cancelled" />
                            <Label htmlFor="sms-cancelled" className="text-sm font-normal">
                              Citas canceladas
                            </Label>
                          </div>
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms-reminder" defaultChecked />
                            <Label htmlFor="sms-reminder" className="text-sm font-normal">
                              Recordatorios de citas (24h antes)
                            </Label>
                          </div>
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notificaciones en la aplicación</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="app-all" defaultChecked />
                            <Label htmlFor="app-all" className="text-sm font-normal">
                              Todas las notificaciones
                            </Label>
                          </div>
                          <Bell className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="app-sound" defaultChecked />
                            <Label htmlFor="app-sound" className="text-sm font-normal">
                              Sonidos de notificación
                            </Label>
                          </div>
                          <Bell className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar preferencias
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recordatorios automáticos</CardTitle>
                    <CardDescription>Configura recordatorios automáticos para tus pacientes.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Recordatorios de citas</Label>
                      <RadioGroup defaultValue="24h">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="24h" id="r-24h" />
                          <Label htmlFor="r-24h" className="text-sm font-normal">
                            24 horas antes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="48h" id="r-48h" />
                          <Label htmlFor="r-48h" className="text-sm font-normal">
                            48 horas antes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="r-custom" />
                          <Label htmlFor="r-custom" className="text-sm font-normal">
                            Personalizado
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reminder-message">Mensaje de recordatorio</Label>
                      <Textarea
                        id="reminder-message"
                        defaultValue="Recordatorio: Tiene una cita programada con [Profesional] el [Fecha] a las [Hora]. Por favor, confirme su asistencia o contacte con nosotros si necesita reprogramar."
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Utilice [Profesional], [Fecha] y [Hora] como marcadores que serán reemplazados automáticamente.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar configuración
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Configuración de cuenta */}
              <TabsContent value="account" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil de usuario</CardTitle>
                    <CardDescription>Actualiza tu información personal y de acceso.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Avatar" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Cambiar foto
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, GIF o PNG. Máximo 1MB.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Nombre</Label>
                        <Input id="account-name" defaultValue="María" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-lastname">Apellidos</Label>
                        <Input id="account-lastname" defaultValue="Sánchez" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-email">Correo electrónico</Label>
                        <Input id="account-email" type="email" defaultValue="m.sanchez@clinica.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-phone">Teléfono</Label>
                        <Input id="account-phone" defaultValue="+34 612 345 678" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña para mantener la seguridad de tu cuenta.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                      <Input id="confirm-password" type="password" />
                      <p className="text-xs text-muted-foreground">
                        La contraseña debe tener al menos 8 caracteres e incluir letras, números y caracteres
                        especiales.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">Actualizar contraseña</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de la cuenta</CardTitle>
                    <CardDescription>Personaliza la configuración de tu cuenta.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select defaultValue="es">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Zona horaria</Label>
                      <Select defaultValue="europe-madrid">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar zona horaria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe-madrid">Europa/Madrid (GMT+1)</SelectItem>
                          <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
                          <SelectItem value="america-new_york">América/Nueva York (GMT-5)</SelectItem>
                          <SelectItem value="america-los_angeles">América/Los Ángeles (GMT-8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="dark-mode" />
                      <Label htmlFor="dark-mode" className="text-sm font-normal">
                        Activar modo oscuro
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar preferencias
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
