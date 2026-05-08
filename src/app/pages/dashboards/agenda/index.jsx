import { useEffect, useState } from 'react'
import { Page } from "components/shared/Page"
import { Button, Input, Select, InputErrorMsg } from "components/ui"
import { ProductService } from "../../../../services/Product/index.jsx"
import { BarberService } from "../../../../services/Barber/index.jsx"
import { useAuthContext } from "../../../contexts/auth/context.js";

export default function Agenda() {
    const [products, setProducts] = useState([])
    const [barbers, setBarbers] = useState([])
    const [date, setDate] = useState('')
    const [productId, setProductId] = useState('')
    const [barberId, setBarberId] = useState('')
    const [customDuration, setCustomDuration] = useState('')
    const [currency, setCurrency] = useState(0)
    const [blocks, setBlocks] = useState([])
    const [timeRange, setTimeRange] = useState({ start: 480, end: 1380 })
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false) // Estado para controlar o loading

    const { user } = useAuthContext()
    const token = user?.session?.accessToken

    useEffect(() => {
        localStorage.removeItem('date')
        localStorage.removeItem('productId')
        localStorage.removeItem('barberId')
        localStorage.removeItem('customDuration')

        const fetchData = async () => {
            try {
                const [productsData, barbersData] = await Promise.all([
                    ProductService.getAll(),
                    BarberService.getAll()
                ])
                setProducts(productsData.data || [])
                setBarbers(barbersData || [])
            } catch (error) {
                console.error("Erro ao buscar produtos ou barbeiros:", error)
                setErrorMessage("Erro ao carregar dados iniciais")
            }
        }

        fetchData()
    }, [])

    const formatTime = (minutos) => {
        const h = Math.floor(minutos / 60)
        const m = minutos % 60
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m
    }

    const parseTimeToMinutes = (timeStr) => {
        const [hh, mm] = timeStr.split(':').map(Number)
        return hh * 60 + mm
    }

    const DAY_START = 480
    const DAY_END = 1260

    const validateFields = () => {
        if (!date) {
            setErrorMessage("Selecione uma data para consultar")
            return false
        }

        if (!barberId) {
            setErrorMessage("Selecione um barbeiro")
            return false
        }

        setErrorMessage('')
        return true
    }

    const handleFetch = async () => {
        if (!token) {
            setErrorMessage("Token de autenticação não encontrado")
            return
        }

        if (!validateFields()) {
            return
        }

        setIsLoading(true)
        setBlocks([])
        setCurrency(0)

        localStorage.setItem('date', date)
        localStorage.setItem('productId', productId)
        localStorage.setItem('barberId', barberId)
        localStorage.setItem('customDuration', customDuration)

        const API_URL = import.meta.env.VITE_API_URL
        const appointmentsUrl = `${API_URL}/v1/appointments/barber-appointments/${barberId}?startDate=${date}&endDate=${date}`
        const summaryUrl = `${API_URL}/v1/appointments/summary?date=${date}&productId=${productId}&barberId=${barberId}`

        try {
            const [appointmentsResp, summaryResp] = await Promise.all([
                fetch(appointmentsUrl, {
                    headers: { 'Authorization': 'Bearer ' + token },
                }).then(r => r.json()),
                fetch(summaryUrl, {
                    headers: { 'Authorization': 'Bearer ' + token },
                }).then(r => r.json()),
            ])

            if (appointmentsResp.status !== 'success') {
                setErrorMessage('Erro na consulta de agendamentos: ' + (appointmentsResp?.message || ''))
                setIsLoading(false)
                return
            }
            if (summaryResp.status !== 'success') {
                setErrorMessage('Erro na consulta de horários disponíveis: ' + (summaryResp?.message || ''))
                setIsLoading(false)
                return
            }

            let appointments = appointmentsResp.data
            const summaryData = summaryResp.data
            const productDuration = parseInt(summaryData.productDuration || customDuration || 10)

            if (productId) {
                appointments = appointments.filter(appointment =>
                    appointment.productRef?.id === productId
                )
            }

            let globalMinStart = Infinity
            let globalMaxEnd = -Infinity

            appointments.forEach(ap => {
                if (ap.startTime < globalMinStart) globalMinStart = ap.startTime
                if (ap.startTime + ap.duration > globalMaxEnd) globalMaxEnd = ap.startTime + ap.duration
            })

            summaryData.forEach(item => {
                if (!item.period) return

                const [startStr, endStr] = item.period.split('-').map(s => s.trim())
                const startMinutes = parseTimeToMinutes(startStr)
                const endMinutes = parseTimeToMinutes(endStr)

                if (startMinutes < globalMinStart) globalMinStart = startMinutes
                if (endMinutes > globalMaxEnd) globalMaxEnd = endMinutes
            })

            if (globalMinStart === Infinity || globalMaxEnd === -Infinity) {
                globalMinStart = DAY_START
                globalMaxEnd = DAY_END
            } else {
                globalMinStart = Math.max(DAY_START, Math.floor(globalMinStart / 60) * 60 - 120)
                globalMaxEnd = Math.min(DAY_END, Math.ceil(globalMaxEnd / 60) * 60 + 120)

                if (globalMaxEnd - globalMinStart < 240) {
                    const center = Math.floor((globalMinStart + globalMaxEnd) / 2)
                    globalMinStart = Math.max(DAY_START, center - 120)
                    globalMaxEnd = Math.min(DAY_END, center + 120)
                }
            }

            setTimeRange({ start: globalMinStart, end: globalMaxEnd })

            const colorMap = new Array(1440).fill(null).map(() => ({
                color: 3,
                product: null,
                user: null,
            }))

            let totalCurrency = 0

            for (const ap of appointments) {
                const start = ap.startTime
                const end = start + ap.duration

                const prod = ap.productRef ? `${ap.productRef.name} - R$ ${(ap.productRef.unitAmount / 100).toFixed(2)}` : 'Produto'
                totalCurrency += (ap.productRef?.unitAmount / 100) || 0
                const user = ap.userRef?.name || 'Usuário'

                for (let m = start; m < end && m < 1440; m++) {
                    if (m < globalMinStart || m >= globalMaxEnd) continue

                    colorMap[m].color = 1
                    colorMap[m].product = prod
                    colorMap[m].user = user
                }
            }

            setCurrency(totalCurrency)

            for (const periodItem of summaryData) {
                const availableSlots = periodItem?.availableSlots || []
                for (const slotStr of availableSlots) {
                    const start = parseTimeToMinutes(slotStr)
                    const end = start + productDuration

                    for (let m = start; m < end && m < 1440; m++) {
                        if (m < globalMinStart || m >= globalMaxEnd) continue

                        if (colorMap[m].color === 3) {
                            colorMap[m].color = 2
                        }
                    }
                }
            }

            let currentColor = colorMap[globalMinStart].color
            let currentProd = colorMap[globalMinStart].product
            let currentUser = colorMap[globalMinStart].user
            let blockStart = globalMinStart

            const newBlocks = []

            for (let i = globalMinStart + 1; i <= globalMaxEnd; i++) {
                const c = i < globalMaxEnd ? colorMap[i].color : currentColor
                const p = i < globalMaxEnd ? colorMap[i].product : currentProd
                const u = i < globalMaxEnd ? colorMap[i].user : currentUser

                if (c !== currentColor || p !== currentProd || u !== currentUser || i === globalMaxEnd) {
                    if (i > blockStart) {
                        newBlocks.push({
                            startMinute: blockStart,
                            endMinute: i,
                            colorCode: currentColor,
                            productName: currentProd,
                            userName: currentUser
                        })
                    }

                    currentColor = c
                    currentProd = p
                    currentUser = u
                    blockStart = i
                }
            }

            setBlocks(newBlocks)
        } catch (err) {
            console.error('Erro na busca unificada:', err)
            setErrorMessage('Ocorreu um erro ao buscar os dados. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClearFilters = () => {
        setDate('')
        setProductId('')
        setBarberId('')
        setCustomDuration('')
        setBlocks([])
        setCurrency(0)
        setTimeRange({ start: 480, end: 1380 })
    }

    const generateTimeLabels = () => {
        const labels = []
        const startHour = Math.floor(timeRange.start / 60)
        const endHour = Math.ceil(timeRange.end / 60)

        for (let hour = startHour; hour <= endHour; hour++) {
            labels.push({
                hour: hour.toString().padStart(2, '0'),
                position: hour * 60 - timeRange.start
            })
        }
        return labels
    }

    const timeLabels = generateTimeLabels()

    return (
        <Page title="Agenda">
            <div className={"w-full px-4 pt-5"}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl text-gray-800 dark:text-gray-200">Agenda do Barbeiro</h2>
                </div>

                <div className={`rounded-lg shadow-sm p-5 mb-6 border border-gray-200 dark:border-gray-800`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <Select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        >
                            <option value="">Selecione o produto (opcional)</option>
                            {products.map((prod) => (
                                <option key={prod.id} value={prod.id}>
                                    {prod.name}
                                </option>
                            ))}
                        </Select>

                        <Select
                            value={barberId}
                            onChange={(e) => setBarberId(e.target.value)}
                            className="h-[42px] border-gray-300 dark:border-gray-700"
                            required
                        >
                            <option value="">Selecione o barbeiro</option>
                            {barbers.map((barber) => (
                                <option key={barber.id} value={barber.id}>
                                    {barber.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="date"
                            id="date"
                            placeholder="Data"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="h-[42px] border-gray-300 dark:border-gray-700"
                            required
                        />

                        <div className="flex gap-2">
                            <Button
                                id="btnConsultar"
                                onClick={handleFetch}
                                color="primary"
                                className="h-[42px] flex-1"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Carregando...
                                    </span>
                                ) : 'Consultar'}
                            </Button>
                            <Button
                                onClick={handleClearFilters}
                                className="h-[42px]"
                                disabled={isLoading}
                            >
                                Limpar
                            </Button>
                        </div>
                        <div className={'mt-2'}>
                            <p className=" text-2xl font-bold">
                                R$ {currency.toFixed(2).replace('.', ',')}
                            </p>
                        </div>
                    </div>
                </div>

                <InputErrorMsg when={!!errorMessage}>
                    {errorMessage}
                </InputErrorMsg>

                <div className={`rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800 dark:bg-gray-800 ${isLoading ? 'opacity-70' : ''}`}>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex flex-col items-center">
                                <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="mt-2 text-gray-600 dark:text-gray-400">Carregando agenda...</span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="flex border border-gray-200 dark:border-gray-700 relative w-full mx-auto"
                            style={{ height: `${timeRange.end - timeRange.start}px` }}
                        >
                            <div className={`w-[80px] border-r border-gray-200 dark:border-gray-700 relative text-xs bg-white dark:bg-gray-800`}>
                                {timeLabels.map((label) => (
                                    <div
                                        key={label.hour}
                                        className={`absolute left-0 w-full text-right pr-2 border-t border-gray-200 dark:border-gray-700 py-1 flex items-center`}
                                        style={{ top: `${label.position}px`, height: '60px' }}
                                    >
                                        <span className={'absolute ml-5 top-0'}>{label.hour}:00</span>
                                        <div
                                            className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 dark:bg-gray-700"
                                            style={{ width: 'calc(100% + 100vw)' }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1 relative">
                                {timeLabels.slice(0, -1).map((label) => (
                                    <div
                                        key={`half-${label.hour}`}
                                        className="absolute left-0 right-0 h-px bg-gray-300 dark:bg-gray-700"
                                        style={{ top: `${label.position + 30}px` }}
                                    />
                                ))}

                                {blocks.map((block, index) => {
                                    const startStr = formatTime(block.startMinute)
                                    const endStr = formatTime(block.endMinute)
                                    const height = block.endMinute - block.startMinute
                                    const top = block.startMinute - timeRange.start
                                    const isCompact = height < 50

                                    let label = ''
                                    if (block.colorCode === 1) {
                                        label = isCompact ? (
                                            <span>
                                                <strong>{block.productName}</strong> {block.userName} {startStr} - {endStr}
                                            </span>
                                        ) : (
                                            <>
                                                <strong className="block font-semibold">{block.productName}</strong>
                                                <span className="block text-xs mt-1">{block.userName}</span>
                                                <span className="block text-xs mt-1">{startStr} - {endStr}</span>
                                            </>
                                        )
                                    } else if (block.colorCode === 2) {
                                        label = (
                                            <>
                                                <strong className="block font-semibold">Disponível</strong>
                                                <span className="block text-xs mt-1">{startStr} - {endStr}</span>
                                            </>
                                        )
                                    } else {
                                        label = (
                                            <>
                                                <strong className="block font-semibold">Indisponível</strong>
                                                <span className="block text-xs mt-1">{startStr} - {endStr}</span>
                                            </>
                                        )
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`absolute left-2.5 right-2.5 text-white text-xs overflow-hidden p-2 rounded-md shadow-sm transition-all duration-200 
                                                ${block.colorCode === 1 ? 'bg-blue-500 border border-blue-300 dark:border-blue-700' :
                                                block.colorCode === 2 ? 'bg-green-500 border border-green-300 dark:border-green-700' :
                                                    'bg-gray-500 border border-gray-300 dark:border-gray-700'}`}
                                            style={{
                                                top: `${top}px`,
                                                height: `${height}px`
                                            }}
                                        >
                                            {label}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    )
}