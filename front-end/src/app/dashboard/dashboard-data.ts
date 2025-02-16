import { ChartConfig } from '@/components/ui/chart';

import createApiInstance from '@/utils/api';
import { brlFormatter } from '@/utils/format';

// Dados da Seção de Estatísticas

/**
 * Função que retorna os dados de pedidos da Seru API
 * @param setAverageTicket - useState de Ticket Médio
 * @param setTotalOrders - useState de Total de Pedidos
 * @param setTotalValueOrders - useState de Valor Total de Pedidos
 *
 * @param setTotemTotalSales - useState de Valor Total de Vendas do Canal Totem
 * @param setTotemSalesPercentage - useState de Percentual de Vendas do Canal Totem
 * @param setTotemOrders - useState de Total de Pedidos do Canal Totem
 * @param setTotemAverageTicket - useState de Ticket Médio do Canal Totem
 * @param setTotemQuantityOfProducts - useState de Quantidade de Produtos do Canal Totem
 * Os outros parâmetros repetem porém com os canais diferentes
 */
export const getOrders = async (
    setAverageTicket: any,
    setTotalOrders: any,
    setTotalValueOrders: any,

    setTotemTotalSales: any,
    setTotemSalesPercentage: any,
    setTotemOrders: any,
    setTotemAverageTicket: any,
    setTotemQuantityOfProducts: any,

    setPdvTotalSales: any,
    setPdvSalesPercentage: any,
    setPdvOrders: any,
    setPdvAverageTicket: any,
    setPdvQuantityOfProducts: any,

    setMenuTotalSales: any,
    setMenuSalesPercentage: any,
    setMenuOrders: any,
    setMenuAverageTicket: any,
    setMenuQuantityOfProducts: any,

    setAnotaTotalSales: any,
    setAnotaSalesPercentage: any,
    setAnotaOrders: any,
    setAnotaAverageTicket: any,
    setAnotaQuantityOfProducts: any,

    setChartDataChannelSales: any,
) => {
    const api = await createApiInstance();

    try {
        // Requisição de Pedidos
        const response = await api.get('/orders', {
            params: {
                initialUpdatedAt: '2025-02-13T00:00:00Z',
                finalUpdatedAt: '2025-02-13T23:59:59Z',
            },
        });

        // Variáveis iniciais
        let totalValue = 0;

        // Variáveis Vitrine Totem
        let totemTotalSales = 0;
        let totemTotalOrders = 0;
        let totemTotalProducts = 0;

        // Variáveis Pdv Fácil
        let pdvTotalSales = 0;
        let pdvTotalOrders = 0;
        let pdvTotalProducts = 0;

        // Variáveis Menu Fácil
        let menuTotalSales = 0;
        let menuTotalOrders = 0;
        let menuTotalProducts = 0;

        // Variáveis Anota AI
        let anotaTotalSales = 0;
        let anotaTotalOrders = 0;
        let anotaTotalProducts = 0;

        // Percorre todos os pedidos
        for (let index = 0; index < response.data.length; index++) {
            // Valor Total dos Pedidos
            const ordersValue = response.data[index].total;
            totalValue += ordersValue;

            // Vitrine Totem
            const vitTotem = response.data[index].salesChannel.tag === 'totem';
            if (vitTotem) {
                const totemSales = response.data[index].total;
                totemTotalSales += totemSales;

                totemTotalOrders++;

                const totemQuantityOfProducts =
                    response.data[index].items[0].quantity;
                totemTotalProducts += totemQuantityOfProducts;
            }

            // Pdv Fácil
            const pdvFacil =
                response.data[index].salesChannel.tag === 'pdv-facil';
            if (pdvFacil) {
                const pdvSales = response.data[index].total;
                pdvTotalSales += pdvSales;

                pdvTotalOrders++;

                const pdvQuantityOfProducts =
                    response.data[index].items[0].quantity;
                pdvTotalProducts += pdvQuantityOfProducts;
            }

            // Menu Fácil
            const menuFacil =
                response.data[index].salesChannel.tag === 'menu-facil';
            if (menuFacil) {
                const menuSales = response.data[index].total;
                menuTotalSales += menuSales;

                menuTotalOrders++;

                const menuQuantityOfProducts =
                    response.data[index].items[0].quantity;
                menuTotalProducts += menuQuantityOfProducts;
            }

            // Anota AI
            const anotaFacil =
                response.data[index].salesChannel.tag === 'anota-ai';
            if (anotaFacil) {
                const anotaSales = response.data[index].total;
                anotaTotalSales += anotaSales;

                anotaTotalOrders++;

                const anotaQuantityOfProducts =
                    response.data[index].items[0].quantity;
                anotaTotalProducts += anotaQuantityOfProducts;
            }
        }

        // Dados estatísticos (faturamento, pedidos e ticket médio)
        setTotalValueOrders(brlFormatter.format(totalValue));
        setTotalOrders(response.data.length);
        setAverageTicket(
            brlFormatter.format(totalValue / response.data.length),
        );

        // Canal Vitrine Totem
        setTotemTotalSales(brlFormatter.format(totemTotalSales));
        const totemSalesPercentage = Math.floor(
            (totemTotalSales / totalValue) * 100,
        );
        setTotemSalesPercentage(totemSalesPercentage);
        setTotemOrders(totemTotalOrders);
        setTotemAverageTicket(
            brlFormatter.format(totemTotalSales / totemTotalOrders),
        );
        setTotemQuantityOfProducts(totemTotalProducts);

        // Canal Pdv Fácil
        setPdvTotalSales(brlFormatter.format(pdvTotalSales));
        const pdvSalesPercentage = Math.floor(
            (pdvTotalSales / totalValue) * 100,
        );
        setPdvSalesPercentage(pdvSalesPercentage);
        setPdvOrders(pdvTotalOrders);
        setPdvAverageTicket(
            brlFormatter.format(pdvTotalSales / pdvTotalOrders),
        );
        setPdvQuantityOfProducts(pdvTotalProducts);

        // Canal Menu Fácil
        setMenuTotalSales(brlFormatter.format(menuTotalSales));
        const menuSalesPercentage = Math.floor(
            (menuTotalSales / totalValue) * 100,
        );
        setMenuSalesPercentage(menuSalesPercentage);
        setMenuOrders(menuTotalOrders);
        setMenuAverageTicket(
            brlFormatter.format(menuTotalSales / menuTotalOrders),
        );
        setMenuQuantityOfProducts(menuTotalProducts);

        // Canal Anota AI
        setAnotaTotalSales(brlFormatter.format(anotaTotalSales));
        const anotaSalesPercentage = Math.floor(
            (anotaTotalSales / totalValue) * 100,
        );
        setAnotaSalesPercentage(anotaSalesPercentage);
        setAnotaOrders(anotaTotalOrders);
        setAnotaAverageTicket(
            brlFormatter.format(anotaTotalSales / anotaTotalOrders),
        );
        setAnotaQuantityOfProducts(anotaTotalProducts);

        // Dados do Gráfico de Vendas por Canal
        const chartDataChannelSales = [
            {
                channel: 'vitrineTotem',
                sales: totemSalesPercentage,
                fill: 'var(--color-vitrineTotem)',
            },
            {
                channel: 'pdvFacil',
                sales: pdvSalesPercentage,
                fill: 'var(--color-pdvFacil)',
            },
            {
                channel: 'menuFacil',
                sales: menuSalesPercentage,
                fill: 'var(--color-menuFacil)',
            },
            {
                channel: 'anotaAi',
                sales: anotaSalesPercentage,
                fill: 'var(--color-anotaAi)',
            },
        ];
        setChartDataChannelSales(chartDataChannelSales);
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
    }
};

// Gráfico de Faturamento

export const chartDataBilling = [
    { month: 'Janeiro', ano_atual: 186, ano_anterior: 801 },
    { month: 'Fevereiro', ano_atual: 305, ano_anterior: 200 },
    { month: 'Março', ano_atual: 237, ano_anterior: 120 },
    { month: 'Abril', ano_atual: 731, ano_anterior: 190 },
    { month: 'Maio', ano_atual: 209, ano_anterior: 130 },
    { month: 'Junho', ano_atual: 214, ano_anterior: 140 },
    { month: 'Julho', ano_atual: 311, ano_anterior: 253 },
    { month: 'Agosto', ano_atual: 245, ano_anterior: 298 },
    { month: 'Setembro', ano_atual: 312, ano_anterior: 301 },
    { month: 'Outubro', ano_atual: 253, ano_anterior: 289 },
    { month: 'Novembro', ano_atual: 258, ano_anterior: 215 },
    { month: 'Dezembro', ano_atual: 322, ano_anterior: 242 },
];

export const chartConfigBilling = {
    ano_atual: {
        label: 'Ano Atual',
        color: 'hsl(var(--chart-1))',
    },
    ano_anterior: {
        label: 'Ano Anterior',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

// Config do Gráfico de Vendas por Canal

export const chartConfigChannelSales = {
    sales: {
        label: 'Vendas',
    },
    vitrineTotem: {
        label: 'Vitrine Totem',
        color: 'hsl(var(--chart-1))',
    },
    pdvFacil: {
        label: 'Pdv Fácil',
        color: 'hsl(var(--chart-2))',
    },
    menuFacil: {
        label: 'Menu Fácil',
        color: 'hsl(var(--chart-3))',
    },
    anotaAi: {
        label: 'Anota AI',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig;
