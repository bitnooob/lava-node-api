import {sha256} from "js-sha256";
import Payoff from "./Payoff";
import axios from "axios";

type RequestParamsType = {[key: string]: any};

class LavaBusiness {

    public payoff: Payoff;

    protected projectId: string;
    protected secretKey: string;

    constructor(projectId: string, secretKey: string) {
        this.projectId = projectId;
        this.secretKey = secretKey;

        this.payoff = new Payoff(projectId, secretKey);
    }

    public request = async (address: string, params: RequestParamsType = {}) => {
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