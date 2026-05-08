import { Badge, Button } from "../../../../components/ui/index.js"
import { useState } from "react"
import { BarberService } from "../../../../services/Barber/index.jsx"

export default function UserDetails({ user, isBarber, onUpdate, barbers }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

    const handleDeleteBarber = async () => {
        setIsLoading(true)

        try {
            await BarberService.deleteBarber({publicId: user.publicId})
            onUpdate()
            setIsDeleteConfirmOpen(false)
        } catch (error) {
            console.error("Erro ao remover barbeiro:", {
                error,
                user,
                barbers
            });
            alert(error.message || "Erro ao remover barbeiro");
        } finally {
            setIsLoading(false)
        }
    }

    const handleMakeBarber = async () => {
        setIsLoading(true)

        if (!user?.publicId) {
            console.error("Usuário não tem publicId")
            setIsLoading(false)
            return
        }

        try {
            await BarberService.createBarber({ publicId: user.publicId, userId: user.id })
            onUpdate()
            setIsConfirmOpen(false)
        } catch (error) {
            console.error("Erro ao criar barbeiro:", error)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="flex flex-col h-full justify-between ">
            {isConfirmOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-medium mb-4">Transformar em Barbeiro</h3>
                        <p className="mb-6">Tem certeza que deseja transformar {user.name} em barbeiro?</p>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setIsConfirmOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleMakeBarber}
                                isLoading={isLoading}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-medium mb-4 text-red-600">Remover Barbeiro</h3>
                        <p className="mb-6">
                            Tem certeza que deseja remover <strong>{user.name}</strong> como barbeiro?
                        </p>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleDeleteBarber}
                                isLoading={isLoading}
                            >
                                Remover
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6 text-base text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-950 shadow-lg rounded-2xl p-6">
                <div>
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">ID</h3>
                    <p className="text-lg">{user.id}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Email</h3>
                    <p className="text-lg">{user.email}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Cargo</h3>
                        <Badge
                            className={`text-base px-3 py-1 ${
                                isBarber ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800 dark:hover:bg-red-900/20"
                            }`}
                        >
                            {isBarber ? "Barbeiro" : "Usuário"}
                        </Badge>
                    </div>

                </div>



                <div>
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Telefone</h3>
                    <p className="text-lg">{user.profile?.phone || "-"}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Instagram</h3>
                    <p className="text-lg">
                        {Array.isArray(user.profile?.socialLinks) &&
                        user.profile.socialLinks.find(link => link.id === 'instagram')?.url ? (
                            <a
                                href={`https://instagram.com/${user.profile.socialLinks.find(link => link.id === 'instagram')?.url.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:underline dark:text-primary-400"
                            >
                                {user.profile.socialLinks.find(link => link.id === 'instagram')?.url}
                            </a>
                        ) : (
                            "-"
                        )}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Cadastrado em</h3>
                    <p className="text-lg">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            })
                            : "-"}
                    </p>
                </div>
            </div>

            <div className="pt-6 mb-4">
                {!isBarber ? (
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => setIsConfirmOpen(true)}
                    >
                        Transformar em Barbeiro
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        className="w-full text-red-600 dark:text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => setIsDeleteConfirmOpen(true)}
                    >
                        Remover Barbeiro
                    </Button>
                )}
            </div>
        </div>
    )
}
