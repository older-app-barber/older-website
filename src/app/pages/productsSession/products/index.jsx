import { useEffect, useState } from "react"
import { Page } from "components/shared/Page.jsx"
import { ProductService } from "../../../../services/Product/index.jsx"
import { Table, THead, TBody, Th, Tr, Td, Badge } from "components/ui/index.js"

const cols = ["Id", "Nome", "Preço", "Duração", "Serviços"]

export default function Products() {
    const [products, setProducts] = useState([])

    async function handleProducts() {
        try {
            const response = await ProductService.getAll()
            if (response?.data) {
                setProducts(response.data)
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
        }
    }

    useEffect(() => {
        handleProducts()
    }, [])

    return (
        <Page title="Produtos">
            <div className="hide-scrollbar min-w-full overflow-x-auto p-3.5">
                <h2 className="text-xl font-medium mb-4">Produtos</h2>
                <div className="w-full overflow-x-auto">
                <Table hoverable className="w-full text-left rtl:text-right min-w-[700px]">
                    <THead>
                        <Tr>
                            {cols.map((title, index) => (
                                <Th
                                    key={index}
                                    className={`bg-gray-200 font-semibold normal-case text-gray-800 dark:bg-dark-800 dark:text-dark-100
                                        ${index === 0 ? "ltr:rounded-l-lg rtl:rounded-r-lg" : ""}
                                        ${index === cols.length - 1 ? "ltr:rounded-r-lg rtl:rounded-l-lg" : ""}
                                    `}
                                >
                                    {title}
                                </Th>
                            ))}
                        </Tr>
                    </THead>
                    <TBody>
                        {products.map((product) => (
                            <Tr
                                key={product.id}
                                className="border-y border-transparent border-b-gray-200 dark:border-b-dark-500"
                            >
                                <Td className="ltr:rounded-l-lg rtl:rounded-r-lg">{product.id}</Td>
                                <Td>{product.name}</Td>
                                <Td>
                                    {product.unitAmount
                                        ? (product.unitAmount / 100).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: product.currency?.toUpperCase() || "BRL",
                                        })
                                        : "-"}
                                </Td>
                                <Td>{product.duration ?? "-"}</Td>
                                <Td className="ltr:rounded-r-lg rtl:rounded-l-lg">
                                    <Badge>{product.services?.join(", ") || "-"}</Badge>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
            </div>
        </Page>
    )
}
