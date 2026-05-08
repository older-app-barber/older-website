import { useEffect, useState } from "react"
import { Page } from "components/shared/Page.jsx"
import {
    Table,
    THead,
    TBody,
    Th,
    Tr,
    Td,
    Avatar,
    Badge,
    Input,
    Select, Button, Pagination, PaginationPrevious, PaginationItems, PaginationNext,
} from "components/ui/index.js"
import ActionMenu from "../../dashboards/_components/ActionMenu.jsx"
import { UserService } from "../../../../services/User/index.jsx"
import RightDrawer from "../../../../components/shared/RightDrawer.jsx"
import UserDetails from "./UserDetails.jsx"
import { BarberService } from "../../../../services/Barber/index.jsx"
import {ArrowDownTrayIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import {toast} from "sonner";

const cols = ["", "Id", "Foto", "Nome", "Email", "Cargo", "Telefone", "Criado em"]
const ITEMS_PER_PAGE = 15

export default function Users() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("todos")
    const [barbers, setBarbers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [barberIds, setBarberIds] = useState([])
    const [exportScope] = useState("filtered")
    const [currentPage, setCurrentPage] = useState(1)

    async function handleUsers() {
        try {
            const response = await UserService.getAll()
            const barbers = await BarberService.getAll()
            const ids = barbers.map((b) => b.id)

            setUsers(response)
            setBarbers(barbers)
            setBarberIds(ids)
            setCurrentPage(1)
        } catch (error) {
            console.error("Erro ao buscar usuários ou barbeiros:", error)
        }
    }

    useEffect(() => {
        handleUsers()
    }, [])

    useEffect(() => {
        const filtered = users.filter(({ user, profile }) => {
            const query = searchQuery.toLowerCase()
            const isBarber = barberIds.includes(user.id)
            const cargo = isBarber ? "barbeiro" : "usuário"

            const matchesSearch =
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                (profile?.phone || "").toLowerCase().includes(query) ||
                cargo.includes(query)

            const matchesRole =
                roleFilter === "todos" ||
                (roleFilter === "barbeiro" && isBarber) ||
                (roleFilter === "usuário" && !isBarber)

            return matchesSearch && matchesRole
        })

        setFilteredUsers(filtered)
        setCurrentPage(1)
    }, [users, searchQuery, roleFilter, barberIds])

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    const handleViewUser = (user, profile) => {
        const barber = barbers.find((b) => b.publicId === user.publicId)
        const isBarber = barberIds.includes(user.id)
        setSelectedUser({
            ...user,
            profile,
            userType: isBarber ? "barbeiro" : "usuário",
            barberId: barber?.id || null,
        })
        setDrawerOpen(true)
    }

    const handleClearFilters = () => {
        setSearchQuery("")
        setRoleFilter("todos")
    }

    const exportToCSV = () => {

        const escapeCsv = (str) => {
            if (typeof str !== 'string') return str
            return `"${str.replace(/"/g, '""')}"`
        }

        const dataToExport = exportScope === "filtered" ? filteredUsers : users

        if (dataToExport.length === 0) {
            toast.error("Nenhum dado disponível para exportação")
            return
        }

        const headers = ["ID,Nome,Email,Cargo,Telefone,Criado em"]

        const csvContent = dataToExport.map(({ user, profile }) => {
            const isBarber = barberIds.includes(user.id)
            const cargo = isBarber ? "barbeiro" : "usuário"
            const phone = profile?.phone || "-"
            const createdAt = user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                : "-"

            return [
                user.id,
                escapeCsv(user.name),
                escapeCsv(user.email),
                cargo,
                phone,
                createdAt
            ].join(",")
        }).join("\n")

        const csv = headers.join("\n") + "\n" + csvContent

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `usuarios_${new Date().toISOString().slice(0,10)}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success(`Arquivo CSV exportado com sucesso! (${dataToExport.length} registros)`)
    }


    return (
        <Page title="Usuários">
            <div className="p-3.5 space-y-4">
                <h2 className="text-xl font-medium">Usuários</h2>

                <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:w-auto md:max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-4" />
                        <Input
                            placeholder="Buscar usuário"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 "
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <span className="text-sm font-medium ">Cargo:</span>
                        <Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            data={[
                                { label: "Todos", value: "todos" },
                                { label: "Usuários", value: "usuário" },
                                { label: "Barbeiros", value: "barbeiro" },
                            ]}
                            className="w-40"
                        />
                        {(searchQuery || roleFilter !== "todos") && (
                            <button
                                onClick={handleClearFilters}
                                className="text-sm hover:underline ml-2"
                            >
                                Limpar filtros
                            </button>
                        )}
                    </div>
                    <div>
                    <Button
                        onClick={exportToCSV}
                        color="primary"
                        className="flex items-center gap-2"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Exportar CSV
                    </Button>
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                <Table hoverable className="w-full rounded-lg text-left rtl:text-right">
                    <THead>
                        <Tr>
                            {cols.map((title, index) => (
                                <Th
                                    key={index}
                                    className={`bg-gray-200 font-semibold normal-case text-gray-800 dark:bg-dark-800 dark:text-dark-100
                                     ${index === 0 ? "ltr:rounded-l-lg rtl:rounded-r-lg" : ""}
                                     ${index === cols.length - 1 ? "ltr:rounded-r-lg rtl:rounded-l-lg" : ""}`}
                                >
                                    {title}
                                </Th>
                            ))}

                        </Tr>
                    </THead>
                    <TBody>
                        {paginatedUsers.length === 0 ? (
                            <Tr>
                                <Td colSpan={cols.length} className="text-center py-6 text-gray-500">
                                    Nenhum usuário encontrado.
                                </Td>
                            </Tr>
                        ) : (
                            paginatedUsers.map(({ user, profile }) => {
                                const isBarber = barberIds.includes(user.id)
                                return (
                                    <Tr
                                        key={user.id}
                                        className="border-y border-transparent border-b-gray-200 dark:border-b-dark-500"
                                    >
                                        <Td className="ltr:rounded-l-lg rtl:rounded-r-lg">
                                            <ActionMenu
                                                items={[
                                                    { label: "Visualizar", onClick: () => handleViewUser(user, profile) },
                                                ]}
                                            />
                                        </Td>
                                        <Td>{user.id}</Td>
                                        <Td>
                                            <Avatar
                                                src={user.image}
                                                name={user.name.charAt(0)}
                                                size={8}
                                            />
                                        </Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <Badge className={isBarber ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}>
                                                {isBarber ? "barbeiro" : "usuário"}
                                            </Badge>
                                        </Td>
                                        <Td>{profile?.phone || "-"}</Td>
                                        <Td className="ltr:rounded-r-lg rtl:rounded-l-lg">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                                                : "-"}
                                        </Td>
                                    </Tr>
                                )
                            })
                        )}
                    </TBody>
                </Table>
                </div>
                {filteredUsers.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            total={totalPages}
                            value={currentPage}
                            onChange={setCurrentPage}
                            siblings={1}
                            boundaries={1}
                            className="p-2"
                        >
                            <PaginationPrevious />
                            <PaginationItems />
                            <PaginationNext />
                        </Pagination>
                    </div>
                )}

            </div>

            {selectedUser && (
                <RightDrawer
                    isOpen={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    title={selectedUser.name}
                    subtitle={barberIds.includes(selectedUser.id) ? "Barbeiro" : "Usuário"}
                    avatarSrc={selectedUser.image}
                    items={
                        <UserDetails
                            user={selectedUser}
                            isBarber={barberIds.includes(selectedUser.id)}
                            onUpdate={handleUsers}
                            barbers={barbers}
                        />
                    }
                />
            )}
        </Page>
    )
}
