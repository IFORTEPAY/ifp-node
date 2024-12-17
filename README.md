# iFortepay Node SDK

The official iFortepay Node SDK provides a simple and convenient way to call iFortepay's REST API
in applications written in Node.

- Package version: 1.0.0

# Getting Started

## Installation

### Requirements

Node 16.0 and later.

### Install with npm

```bash
npm install ifp-node@latest --save
```

TypeScript support is included in this package.

### Usage

To use the SDK features, you can import the package and then destruct the imported variable to choose which product do you want to use.

```typescript
const {iFortepay} = require("ifp-node");
const {PG} = iFortepay;

// your codes...
```

# DOCUMENTATION

Find detailed API information and examples for each of our product’s by clicking the links below,

- [Payment Gateway (PG)](docs/pg/PG.md)
