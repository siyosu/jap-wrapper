import fetch from "node-fetch";
import {
    JapBalance,
    JapService,
    JapNewOrder,
    JapOrderStatus,
    JapOrderStatuses,
    JapError,
    JapCreateRefills,
    JapCreateRefill,
    JapRefillStatus,
    JapRefillStatuses,
} from "./types.js";

class Jap {
    private key: string;
    constructor(apiKey: string) {
        this.key = apiKey;
    }

    private async post<T>(payload: { [key: string]: number | string }): Promise<T> {
        const body = Object.assign({ key: this.key }, payload);
        const res = await fetch("https://justanotherpanel.com/api/v2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = (await res.json()) as T;
        return data;
    }

    /**
     * Get your current JAP balance
     */
    public async currentBalance(): Promise<JapBalance> {
        const res = await this.post<JapBalance>({ action: "balance" });
        return res;
    }

    /**
     * Get all services from JAP. At the time this wrapper is created, their total services is 4,892 services.
     */
    public async allServices(): Promise<JapService[]> {
        const res = await this.post<JapService[]>({ action: "services" });
        return res;
    }

    /**
     * Place new order on JAP. The input is based on the service type, each service type have a different parameters
     * @param input
     * @returns
     */
    public async newOrder(input: JapNewOrder): Promise<{ order: number }> {
        const res = await this.post<{ order: number }>({ ...input, action: "add" });
        return res;
    }

    /**
     * Check order status, order ID can be a type of number or string.
     * If you want to check multiple order statuses at the same time, use an array of numbers or string.
     * You can check up to 100 IDs at a time.
     * @param orderId
     * @returns
     */
    public async orderStatus(orderId: number | string | (number | string)[]): Promise<JapOrderStatus | JapOrderStatuses> {
        if (orderId instanceof Array) {
            const res = await this.post<JapOrderStatuses>({ action: "status", orders: orderId.join(",") });
            return res;
        }
        const res = await this.post<JapOrderStatus>({ action: "status", order: orderId });
        return res;
    }

    /**
     * Create refill, order ID can be a type of number or string.
     * If you want to create multiple refill at the same time, use an array of numbers or string.
     * You can create refill up to 100 IDs at a time.
     * It will return refill IDs that can be used for checking refill status
     * @param orderId
     * @returns
     */
    public async createRefill(orderId: number | string | (number | string)[]): Promise<JapError | JapCreateRefills | JapCreateRefill> {
        if (orderId instanceof Array) {
            const res = await this.post<JapCreateRefills>({ action: "refill", orders: orderId.join(",") });
            return res;
        }
        const res = await this.post<JapCreateRefill | JapError>({ action: "refill", order: orderId });
        return res;
    }

    /**
     * Check refill status, refill ID can be a type of number or string.
     * If you want to check multiple refill statuses at the same time, use an array of numbers or string.
     * You can check up to 100 IDs at a time.
     * @param orderId
     * @returns
     */
    public async refillStatus(refillId: number | string | (number | string)[]): Promise<JapRefillStatus | JapRefillStatuses | JapError> {
        if (refillId instanceof Array) {
            const res = this.post<JapRefillStatuses>({ action: "refill_status", refills: refillId.join(",") });
            return res;
        }
        const res = this.post<JapRefillStatus | JapError>({ action: "refill_status", refill: refillId });
        return res;
    }
}

export default Jap;
