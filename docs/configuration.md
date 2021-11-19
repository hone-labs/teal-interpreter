
# TEAL interpreter configuration

A `config` object to configure the TEAL interpreter can be passed to the `execute` function or the constructor of the `TealInterpreter` class. This allows you to configure the state of the interpreter. You can provide values for arguments, globals, locals. You can provide values for transactions and details of accounts, assets and applications.

The `config` object is simple JSON data that follows particular conventions. Before looking at the overall format of the data let's look at how define individual values.

## Definining values

Values are defined using JSON numbers, strings and arrays.

For example to provide a uint64 (bigint) number value just use a literal number:

```json
42
```

Literal strings are translated to a byte array:

```json
"Hello world"
```

You can provide base64 data using the `base64` prefix:

```json
"base64:SGVsbG8gd29ybGQ="
```

To specify an Algorand address use the `addr` prefix:

```json
"addr:7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224"
```

In certain cases (see below) you can also provide arrays of values, for example:

```json
[
    "addr:7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",
    "addr:a-differen-address",
    "addr:some-other-address"
]
```

If you need to specify the contents of a byte[] explicitly you can use an array of numbers and it will be translated into a byte array where each number converts to a single byte:

```json
[1, 2, 3, 4]
```

That covers the main way to provide uint64 and byte[] values to the interpreter.

## Configuring the current transaction

TEAL opcodes [`txn`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txn-f) and [`txna`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txna-f-i) require access to fields/values from the "current transaction".

You can provide these values through the `txn` field of the configuration:

```json
{
    "txn": {
        "Fee": 1000,
        
        /* Other fields and values ... */
    }
}
```

You can literally add any field here from [the TEAL documentation](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txn-f) and then use the field with [`txn`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txn-f) and related opcodes:

```teal
txn Fee
```

When using the [`txna`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txna-f-i) opcode and accessing a transaction field that contains an array of value you will want to put an array of values in your configuration instead of a single value:

```json
{
    "txn": {
        "Accounts": [
            "addr:7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",

            /* And so on ... */
        ],

        /* Other fields and values ... */
    }
}
```

These fields that have array values are accessed in TEAL code using [`txna`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txna-f-i):

```teal
txna Accounts 0
```

## Configuring the transaction group

The [`gtxn`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#gtxn-t-f) family of opcodes require access to an array of transactions.

You can provide the transaction array through the `gtxn` field of the configuration:

```json
{
    "gtxn": [
        /* First transaction */
        {
            /* Fields and values go here */
        },

        /* Second transaction */
        {
            /* Fields and values go here */
        },

        /* And so on ... */
    ]
}
```

The fields of each transaction are defined in the same way as for the `txn` configuration field described in the previous section.

You can then access transactions by index and fields by name using [`gtxn`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#gtxn-t-f), [`gtxna`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#gtxna-t-f-i), [`gtxns`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#gtxns-f) and [`gtxnsa`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#gtxnsa-f-i).

## Configuring accounts

Various opcodes, such as [`balance`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#balance), read information from particular accounts.

For example (in TEAL):

```javascript
addr 7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224
balance // Pushes the balance of the account on the compute stack.
```

For TEAL opcodes like this to work you must provide details for each referenced account in the configuration under the `accounts` field, like this:

```json
{
    "accounts": {
        "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
            "balance": 10000,

            /* Other account details ... */
        },

        /* Other accounts ... */
    }
}
```

This allows you to provide account-related values that are needed to make various TEAL opcodes work.

## Simple account names

For testing and debugging purposes you don't need to use real Algorand addresses in your configuration, instead you can use simple names that are easier to understand and more meaningful.

In this example we use the name "john" instead of the Algorand address in the previous example:

```json
{
    "accounts": {
        "john": {
            "balance": 10000
        }
    }
}
```
