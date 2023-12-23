import LavaBusiness from "./LavaBusiness";

interface PayoffCreateInterface {
    amount: number,
    orderId: string,
    service: string
    hookUrl?: string | null | undefined
    walletTo?: string | undefined
    subtract?: string | undefined
}

interface PayoffInfoInterface {
    orderId: number | string
    payoffId: number | string
}

interface PayoffCheckWalletInterface {
    walletTo: string,
    service: 'card_payoff' | 'qiwi_payoff' | 'lava_payoff' | 'steam_payoff',
}

class Payoff extends LavaBusiness {

    /**
     * Создание вывода. Подробнее: https://dev.lava.ru/business-payoff-create
     * @param params
     */
    public create = (params: PayoffCreateInterface) => {
        return this.request('payoff/create', params);
    }

    /**
     * Получение информации о выводе. Подробнее: https://dev.lava.ru/business-payoff-info
     * @param params
     */
    public info = (params: PayoffInfoInterface) => {
        return this.request('payoff/info', params);
    }

    /**
     * Получение тарифов на вывод средств. Подробнее: https://dev.lava.ru/business-payoff-tariffs
     */
    public getTariffs = () => {
        return this.request('payoff/get-tariffs');
    }

    /**
     * Проверка реквизитов вывода. Подробнее: https://dev.lava.ru/business-payoff-wallet-check
     * @param params
     */
    public checkWallet = (params: PayoffCheckWalletInterface) => {
        return this.request('payoff/check-wallet', params);
    }

}

export default Payoff;