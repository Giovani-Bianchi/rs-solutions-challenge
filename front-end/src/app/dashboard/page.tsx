// Definindo o componente para ser renderizado no lado do cliente (client side)
'use client';

import { useEffect, useState } from 'react';

import { LuBanknote, LuBox } from 'react-icons/lu';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import { LiaChartPieSolid, LiaCoinsSolid } from 'react-icons/lia';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { MdFormatListBulleted } from 'react-icons/md';

import {
    chartConfigBilling,
    chartDataBilling,
    chartConfigChannelSales,
    getOrders,
} from './dashboard-data';

import { tickFormatter } from '@/utils/format';

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from 'recharts';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { useInView } from 'react-intersection-observer';

import { useIsLaptop } from '@/hooks/use-laptop';

export default function Dashboard() {
    const isLaptop = useIsLaptop();

    // Exibe o elemento com 10% dele visível na tela
    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Exibe o elemento com 40% dele visível na tela
    const { ref: ref4, inView: inView4 } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    // useStates com os dados dos gráficos/tabelas

    // Dados estatísticos (faturamento, pedidos e ticket médio)
    const [totalValueOrders, setTotalValueOrders] = useState();
    const [totalOrders, setTotalOrders] = useState();
    const [averageTicket, setAverageTicket] = useState();

    // Canal Vitrine Totem
    const [totemTotalSales, setTotemTotalSales] = useState();
    const [totemSalesPercentage, setTotemSalesPercentage] = useState();
    const [totemOrders, setTotemOrders] = useState();
    const [totemAverageTicket, setTotemAverageTicket] = useState();
    const [totemQuantityOfProducts, setTotemQuantityOfProducts] = useState();

    // Canal Pdv Fácil
    const [pdvTotalSales, setPdvTotalSales] = useState();
    const [pdvSalesPercentage, setPdvSalesPercentage] = useState();
    const [pdvOrders, setPdvOrders] = useState();
    const [pdvAverageTicket, setPdvAverageTicket] = useState();
    const [pdvQuantityOfProducts, setPdvQuantityOfProducts] = useState();

    // Canal Menu Fácil
    const [menuTotalSales, setMenuTotalSales] = useState();
    const [menuSalesPercentage, setMenuSalesPercentage] = useState();
    const [menuOrders, setMenuOrders] = useState();
    const [menuAverageTicket, setMenuAverageTicket] = useState();
    const [menuQuantityOfProducts, setMenuQuantityOfProducts] = useState();

    // Canal Anota AI
    const [anotaTotalSales, setAnotaTotalSales] = useState();
    const [anotaSalesPercentage, setAnotaSalesPercentage] = useState();
    const [anotaOrders, setAnotaOrders] = useState();
    const [anotaAverageTicket, setAnotaAverageTicket] = useState();
    const [anotaQuantityOfProducts, setAnotaQuantityOfProducts] = useState();

    // Gráfico de Vendas por Canal
    const [chartDataChannelSales, setChartDataChannelSales] = useState();

    useEffect(() => {
        getOrders(
            setAverageTicket,
            setTotalOrders,
            setTotalValueOrders,

            setTotemTotalSales,
            setTotemSalesPercentage,
            setTotemOrders,
            setTotemAverageTicket,
            setTotemQuantityOfProducts,

            setPdvTotalSales,
            setPdvSalesPercentage,
            setPdvOrders,
            setPdvAverageTicket,
            setPdvQuantityOfProducts,

            setMenuTotalSales,
            setMenuSalesPercentage,
            setMenuOrders,
            setMenuAverageTicket,
            setMenuQuantityOfProducts,

            setAnotaTotalSales,
            setAnotaSalesPercentage,
            setAnotaOrders,
            setAnotaAverageTicket,
            setAnotaQuantityOfProducts,

            setChartDataChannelSales,
        );
    }, []);

    return (
        <>
            <section
                id="dashboard-header"
                className="flex flex-col gap-4 xl:w-2/4 lg:w-3/4 w-full"
            >
                <h1 className="text-gray-900 md:text-6xl text-4xl font-semibold">
                    Olá, <span className="text-primary-700">Usuário</span>
                </h1>
                <p className="text-gray-600 md:text-lg text-md">
                    Utilize todos os gráficos nesse dashboard para controlar as
                    finanças da sua empresa, conhecer as vendas de cada produto,
                    analisar informações da empresa e muito mais.
                </p>
            </section>

            <section id="statistics" className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-gray-900 md:text-xl text-lg font-semibold">
                        Estatísticas
                    </h2>

                    <motion.div
                        className="grid lg:grid-cols-3 xl:gap-12 gap-6 min-h-[125px]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <div className="bg-white rounded-lg p-3 components-shadow">
                            <div className="flex gap-1 min-h-10 text-gray-900">
                                <LuBanknote
                                    size={20}
                                    className="relative top-[1px]"
                                />
                                <h3 className="text-sm font-medium">
                                    FATURAMENTO TOTAL
                                </h3>
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <h4 className="text-gray-900 text-xl font-semibold">
                                    {totalValueOrders == null ? (
                                        <p className="text-gray-600 text-lg">
                                            Carregando...
                                        </p>
                                    ) : (
                                        totalValueOrders
                                    )}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-[2px] p-[2px] text-green-medium text-xs font-medium bg-green-light border-[0.5px] border-green-pure rounded-lg">
                                        1,3%
                                        <IoArrowUp size={12} />
                                    </div>
                                    <p className="text-gray-600 text-xs font-medium">
                                        mês passado
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 components-shadow">
                            <div className="flex gap-1 min-h-10 text-gray-900">
                                <LuBox
                                    size={20}
                                    className="relative top-[1px]"
                                />
                                <h3 className="text-sm font-medium">
                                    QUANTIDADE DE PEDIDOS
                                </h3>
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <h4 className="text-gray-900 text-xl font-semibold">
                                    {totalOrders == null ? (
                                        <p className="text-gray-600 text-lg">
                                            Carregando...
                                        </p>
                                    ) : (
                                        totalOrders
                                    )}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-[2px] p-[2px] text-red-medium text-xs font-medium bg-red-light border-[0.5px] border-red-pure rounded-lg">
                                        1,3%
                                        <IoArrowDown size={12} />
                                    </div>
                                    <p className="text-gray-600 text-xs font-medium">
                                        mês passado
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-3 components-shadow">
                            <div className="flex gap-1 min-h-10 text-gray-900">
                                <LiaCoinsSolid
                                    size={20}
                                    className="relative top-[1px]"
                                />
                                <h3 className="text-sm font-medium">
                                    TICKET MÉDIO
                                </h3>
                            </div>

                            <div className="flex flex-col w-full gap-1">
                                <h4 className="text-gray-900 text-xl font-semibold">
                                    {averageTicket == null ? (
                                        <p className="text-gray-600 text-lg">
                                            Carregando...
                                        </p>
                                    ) : (
                                        averageTicket
                                    )}
                                </h4>
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center gap-[2px] p-[2px] text-green-medium text-xs font-medium bg-green-light border-[0.5px] border-green-pure rounded-lg">
                                        1,3%
                                        <IoArrowUp size={12} />
                                    </div>
                                    <p className="text-gray-600 text-xs font-medium">
                                        mês passado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col gap-4 p-3 bg-white rounded-lg components-shadow">
                    <div className="flex items-center gap-1 text-gray-900">
                        <BiBarChartAlt2 size={20} />
                        <h3 className="text-sm font-medium">
                            GRÁFICO DE FATURAMENTO (R$)
                        </h3>
                    </div>

                    <ChartContainer
                        config={chartConfigBilling}
                        className="lg:h-[400px] h-[300px] w-full"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartDataBilling}
                            margin={
                                isLaptop ? { left: -16, right: 4 } : undefined
                            }
                        >
                            <CartesianGrid horizontal={false} />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={4}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={6}
                                tickFormatter={(value) => tickFormatter(value)}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />

                            <ChartLegend
                                verticalAlign="top"
                                className="mb-2"
                                content={<ChartLegendContent />}
                            />

                            <Line
                                dataKey="ano_atual"
                                type="monotone"
                                stroke="var(--color-ano_atual)"
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                dataKey="ano_anterior"
                                type="monotone"
                                stroke="var(--color-ano_anterior)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </section>

            <section id="channels" className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-gray-900 md:text-xl text-lg font-semibold">
                        Canais
                    </h2>

                    <div className="flex flex-col gap-4 p-3 bg-white rounded-lg components-shadow">
                        <div className="flex items-center gap-1 text-gray-900">
                            <LiaChartPieSolid size={20} />
                            <h3 className="text-sm font-medium">
                                GRÁFICO DE VENDAS POR CANAL (%)
                            </h3>
                        </div>

                        <div
                            className={
                                (cn('flex justify-center'),
                                chartDataChannelSales
                                    ? ''
                                    : 'relative lg:h-[400px] h-[300px]')
                            }
                            ref={ref1}
                        >
                            {inView1 ? (
                                chartDataChannelSales ? (
                                    <ChartContainer
                                        config={chartConfigChannelSales}
                                        className="aspect-square lg:h-[400px] h-[300px] w-full"
                                    >
                                        <PieChart>
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent
                                                        percentage={true}
                                                    />
                                                }
                                            />

                                            <ChartLegend
                                                className="flex flex-wrap"
                                                content={<ChartLegendContent />}
                                            />

                                            <Pie
                                                data={chartDataChannelSales}
                                                dataKey="sales"
                                                nameKey="channel"
                                                innerRadius={
                                                    !isLaptop ? 110 : 70
                                                }
                                            ></Pie>
                                        </PieChart>
                                    </ChartContainer>
                                ) : (
                                    <p className="text-gray-600 text-sm absolute-center">
                                        Carregando...
                                    </p>
                                )
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-3 bg-white rounded-lg components-shadow">
                    <div className="flex items-center gap-1 text-gray-900">
                        <MdFormatListBulleted size={20} />
                        <h3 className="text-sm font-medium">
                            RANKING DE VENDAS POR CANAL
                        </h3>
                    </div>

                    <div className="md:px-3 md:pb-3" ref={ref4}>
                        {inView4 ? (
                            <motion.div
                                className="lg:max-h-[400px] max-h-[300px] w-full relative overflow-auto rounded-t-lg"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Table>
                                    <TableHeader className="sticky top-0">
                                        <TableRow header={true}>
                                            <TableHead className="min-w-[130px]">
                                                Canal
                                            </TableHead>
                                            <TableHead>Vendas (R$)</TableHead>
                                            <TableHead>%</TableHead>
                                            <TableHead>Pedidos</TableHead>
                                            <TableHead>
                                                Ticket Médio (R$)
                                            </TableHead>
                                            <TableHead>
                                                Qtd de Produtos
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Vitrine Totem</TableCell>
                                            <TableCell>
                                                {totemTotalSales == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    totemTotalSales
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totemSalesPercentage ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    totemSalesPercentage + '%'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totemOrders == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    totemOrders
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totemAverageTicket == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    totemAverageTicket
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totemQuantityOfProducts ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    totemQuantityOfProducts
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Pdv Fácil</TableCell>
                                            <TableCell>
                                                {pdvTotalSales == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    pdvTotalSales
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {pdvSalesPercentage == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    pdvSalesPercentage + '%'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {pdvOrders == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    pdvOrders
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {pdvAverageTicket == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    pdvAverageTicket
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {pdvQuantityOfProducts ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    pdvQuantityOfProducts
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Menu Fácil</TableCell>
                                            <TableCell>
                                                {menuTotalSales == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    menuTotalSales
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {menuSalesPercentage == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    menuSalesPercentage + '%'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {menuOrders == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    menuOrders
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {menuAverageTicket == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    menuAverageTicket
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {menuQuantityOfProducts ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    menuQuantityOfProducts
                                                )}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Anota AI</TableCell>
                                            <TableCell>
                                                {anotaTotalSales == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    anotaTotalSales
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {anotaSalesPercentage ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    anotaSalesPercentage + '%'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {anotaOrders == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    anotaOrders
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {anotaAverageTicket == null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    anotaAverageTicket
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {anotaQuantityOfProducts ==
                                                null ? (
                                                    <p className="text-gray-600 text-sm">
                                                        Carregando...
                                                    </p>
                                                ) : (
                                                    anotaQuantityOfProducts
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </motion.div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </section>

            <section
                id="rschallenge"
                className="flex justify-center items-center h-[100px] p-3 bg-white rounded-lg components-shadow"
            >
                <h3 className="md:text-md text-sm text-primary-700">
                    © 2025 RS Solutions Challenge
                </h3>
            </section>
        </>
    );
}
