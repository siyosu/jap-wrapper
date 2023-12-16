# Jap Wrapper

A JavaScript wrapper for Just Another Panel (JAP) API.

This wrapper leaves API responses unaltered and doesn't manage errors, requiring manual handling.

## Installation

```
npm install jap-wrapper
```

## Examples

```js
import Jap from "jap-wrapper";

const jap = new Jap("your-api-key");

(async () => {
    try {
        const res = await jap.currentBalance();
        console.log(res);
    } catch (error) {
        // ....
    }
})();
```

## API

-   `Jap.currentBalance()` Get the current balance of your JAP account
-   `Jap.allServices()` Get all JAP services
-   `Jap.newOrder()` Place new order on JAP
-   `Jap.orderStatus()` Check order status for one or multiple order IDs
-   `Jap.createRefill()` Create a refill for one or multiple order IDs, ensure the service for the provided order has refill available
-   `Jap.refillStatus()` Check refill status for one or multiple order IDs

You can check JAP api documentaion [here](https://justanotherpanel.com/api)

## License

[MIT](./LICENSE)
