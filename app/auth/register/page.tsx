"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarClock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  // Estado para cuenta personal
  const [personalFirstName, setPersonalFirstName] = useState("")
  const [personalLastName, setPersonalLastName] = useState("")
  const [personalEmail, setPersonalEmail] = useState("")
  const [personalPassword, setPersonalPassword] = useState("")

  // Estado para cuenta profesional
  const [proFirstName, setProFirstName] = useState("")
  const [proLastName, setProLastName] = useState("")
  const [proEmail, setProEmail] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [accountType, setAccountType] = useState("individual")
  const [proPassword, setProPassword] = useState("")

  const handlePersonalRegister = () => {
    console.log({
      type: "personal",
      firstName: personalFirstName,
      lastName: personalLastName,
      email: personalEmail,
      password: personalPassword,
    })
    // Aquí podrías llamar a tu API de registro
  }

  const handleProfessionalRegister = () => {
    console.log({
      type: "professional",
      firstName: proFirstName,
      lastName: proLastName,
      email: proEmail,
      specialty,
      accountType,
      password: proPassword,
    })
    // Aquí podrías llamar a tu API de registro
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <CalendarClock className="h-6 w-6 text-teal-600" />
        <span className="text-lg font-bold">MiCita</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crea tu cuenta</h1>
          <p className="text-sm text-muted-foreground">Regístrate para comenzar a gestionar tus citas</p>
        </div>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Profesional</TabsTrigger>
          </TabsList>

          {/* Cuenta Personal */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Cuenta personal</CardTitle>
                <CardDescription>Crea una cuenta para agendar citas con profesionales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input id="first-name" required value={personalFirstName} onChange={(e) => setPersonalFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input id="last-name" required value={personalLastName} onChange={(e) => setPersonalLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" required value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={personalPassword}
                      onChange={(e) => setPersonalPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Mostrar/ocultar contraseña</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">La contraseña debe tener al menos 8 caracteres</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handlePersonalRegister}>
                  Crear cuenta
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Cuenta Profesional */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Cuenta profesional</CardTitle>
                <CardDescription>Crea una cuenta para ofrecer tus servicios profesionales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pro-first-name">Nombre</Label>
                    <Input id="pro-first-name" required value={proFirstName} onChange={(e) => setProFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pro-last-name">Apellido</Label>
                    <Input id="pro-last-name" required value={proLastName} onChange={(e) => setProLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-email">Correo electrónico</Label>
                  <Input id="pro-email" type="email" required value={proEmail} onChange={(e) => setProEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Input id="specialty" required value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de cuenta</Label>
                  <RadioGroup defaultValue={accountType} onValueChange={setAccountType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Profesional individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <Label htmlFor="organization">Organización/Clínica</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="pro-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={proPassword}
                      onChange={(e) => setProPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Mostrar/ocultar contraseña</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">La contraseña debe tener al menos 8 caracteres</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleProfessionalRegister}>
                  Crear cuenta profesional
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="text-teal-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
