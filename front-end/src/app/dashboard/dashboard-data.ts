import { ChartConfig } from '@/components/ui/chart';

import createApiInstance from '@/utils/api';
import { brlFormatter } from '@/utils/format';

// Dados da Seção de Estatísticas

/**
 * Função que retorna os dados de pedidos da Seru API
 * @param setStats - useState para armazenar os dados dos pedidos
 */
/* eslint-disable */
export const getOrders = async (setStats: Function) => {
    const api = await createApiInstance();

    try {
        const response = await api.get('/orders', {
            params: {
                initialUpdatedAt: '2025-02-13T00:00:00Z',
                finalUpdatedAt: '2025-02-13T23:59:59Z',
            },
        });

        let totalValue = 0;
        const totalOrders = response.data.length;
        const channelData: Record<string, any> = {
            totem: { totalSales: 0, orders: 0, quantityOfProducts: 0 },
            'pdv-facil': { totalSales: 0, orders: 0, quantityOfProducts: 0 },
            'menu-facil': { totalSales: 0, orders: 0, quantityOfProducts: 0 },
            'anota-ai': { totalSales: 0, orders: 0, quantityOfProducts: 0 },
        };

        // Processando os pedidos
        response.data.forEach((order: any) => {
            totalValue += order.total;

            const channelTag = order.salesChannel.tag;
            if (channelData[channelTag]) {
                channelData[channelTag].totalSales += order.total;
                channelData[channelTag].orders++;
                channelData[channelTag].quantityOfProducts +=
                    order.items[0].quantity;
            }
        });

        /* eslint-enable */

        // Calculando estatísticas e formatando valores
        Object.keys(channelData).forEach((channel) => {
            const ch = channelData[channel];
            ch.salesPercentage =
                Math.floor((ch.totalSales / totalValue) * 100) || 0;
            ch.averageTicket = ch.orders > 0 ? ch.totalSales / ch.orders : 0;
        });

        // Definindo os dados para o estado
        setStats({
            totalValueOrders: brlFormatter.format(totalValue),
            totalOrders,
            averageTicket:
                totalOrders > 0
                    ? brlFormatter.format(totalValue / totalOrders)
                    : 'R$ 0,00',
            channels: channelData,
            loading: false,
        });
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
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
