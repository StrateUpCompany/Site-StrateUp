"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, MoreVertical, UserPlus, AlertCircle, CheckCircle, Search } from "lucide-react"

// Mock data - in a real app, this would come from your database
const mockUsers = [
  {
    id: "1",
    email: "admin@strateup.com",
    name: "Administrador Principal",
    role: "admin",
    status: "active",
    lastLogin: "2023-05-20T14:30:00Z",
    created_at: "2023-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "editor@strateup.com",
    name: "Editor de Conteúdo",
    role: "editor",
    status: "active",
    lastLogin: "2023-05-19T09:45:00Z",
    created_at: "2023-02-10T11:30:00Z",
  },
  {
    id: "3",
    email: "marketing@strateup.com",
    name: "Gerente de Marketing",
    role: "marketing",
    status: "active",
    lastLogin: "2023-05-18T16:20:00Z",
    created_at: "2023-03-05T14:15:00Z",
  },
  {
    id: "4",
    email: "analyst@strateup.com",
    name: "Analista de Dados",
    role: "analyst",
    status: "inactive",
    lastLogin: "2023-04-10T11:10:00Z",
    created_at: "2023-04-01T09:00:00Z",
  },
]

export default function UserManager() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter ? user.role === roleFilter : true
    const matchesStatus = statusFilter ? user.status === statusFilter : true

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")
    setFormSuccess("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Basic validation
    if (!email || !name || !role || !password) {
      setFormError("Todos os campos são obrigatórios")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setFormError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would call your API
      // const result = await createAdminUser(email, password, role)

      // Mock implementation
      setTimeout(() => {
        const newUser = {
          id: (users.length + 1).toString(),
          email,
          name,
          role,
          status: "active",
          lastLogin: null,
          created_at: new Date().toISOString(),
        }

        setUsers([...users, newUser])
        setFormSuccess("Usuário criado com sucesso!")
        setIsLoading(false)

        // Close dialog after a delay
        setTimeout(() => {
          setIsCreateDialogOpen(false)
          setFormSuccess("")
        }, 2000)
      }, 1500)
    } catch (error) {
      console.error("Error creating user:", error)
      setFormError("Erro ao criar usuário. Tente novamente.")
      setIsLoading(false)
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return

    // In a real app, this would call your API
    // const result = await deleteUser(userId)

    // Mock implementation
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0066ff] hover:bg-[#0052cc]">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Usuário</DialogTitle>
              <DialogDescription>Preencha os detalhes para criar um novo usuário administrativo.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateUser}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="email@exemplo.com" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input id="name" name="name" placeholder="Nome completo" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Função
                  </label>
                  <Select name="role" defaultValue="editor">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="analyst">Analista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input id="password" name="password" type="password" required />
                  <p className="text-xs text-gray-500">
                    A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e
                    símbolos.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmar Senha
                  </label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    {formError}
                  </div>
                )}

                {formSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    {formSuccess}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-[#0066ff] hover:bg-[#0052cc]">
                  {isLoading ? "Criando..." : "Criar Usuário"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Gerencie os usuários administrativos do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as funções</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
