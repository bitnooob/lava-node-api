import {sha256} from "js-sha256";
import Payoff from "./Payoff";
import axios from "axios";
import Invoice from "./Invoice";
import Shop from "./Shop";
import Recurrent from "./Recurrent";

type RequestParamsType = {[key: string]: any};

class LavaBusiness {

    public payoff: Payoff;
    public invoice: Invoice;
    public shop: Shop;
    public recurrent: Recurrent;

    protected projectId: string;
    protected secretKey: string;

    constructor(projectId: string, secretKey: string) {
        this.projectId = projectId;
        this.secretKey = secretKey;

        this.payoff = new Payoff(projectId, secretKey);
        this.invoice = new Invoice(projectId, secretKey);
        this.shop = new Shop(projectId, secretKey);
        this.recurrent = new Recurrent(projectId, secretKey);
    }

    protected request = async (address: string, params: RequestParamsType = {}) => {
        const response = await axios.post(
            'https://api.lava.ru/business/' + address,
            {
                ...params,
                signature: this.calculateSignature(params),
                shopId: this.projectId,
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status !== 200) {
            return Promise.reject(response.data);
        }

        return response.data;
    }

    protected calculateSignature = (params: RequestParamsType) => {
        return sha256.hmac(this.secretKey, JSON.stringify(params));
    }

    public calculateWebhookSignature = (additionalKey: string, params: RequestParamsType) => {
        return sha256.hmac(additionalKey, JSON.stringify(params));
    }

}

export default LavaBusiness;