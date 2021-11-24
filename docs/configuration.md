
# TEAL interpreter configuration

A `config` object to configure the TEAL interpreter can be passed to the `execute` function or the constructor of the `TealInterpreter` class. This allows you to configure the state of the interpreter. You can provide values for arguments, globals, locals. You can provide values for transactions and details of accounts, assets and applications.

The `config` object is a simple JSON data object that follows particular conventions. Before looking at the overall format of the data let's look at how define individual values. Skip to the end to see a complete example.

## Definining values

Values are defined using JSON numbers, strings and arrays.

For example to provide a uint64 (bigint) number value just use a literal number:

```javascript
42
```

Literal strings are translated to a byte array:

```javascript
"Hello world"
```

You can provide base64 data using the `base64` prefix:

```javascript
"base64:SGVsbG8gd29ybGQ="
```

To specify an Algorand address use the `addr` prefix:

```javascript
"addr:7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224"
```

In certain cases (see below) you can also provide arrays of values, for example:

```javascript
[
    "addr:7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",
    "addr:a-differen-address",
    "addr:some-other-address"
]
```

If you need to specify the contents of a byte[] explicitly you can use an array of numbers and it will be translated into a byte array where each number converts to a single byte:

```javascript
[1, 2, 3, 4]
```

That covers the main way to provide uint64 and byte[] values to the interpreter.

## Configuring the current transaction

TEAL opcodes [`txn`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txn-f) and [`txna`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#txna-f-i) require access to fields/values from the "current transaction".

You can provide these values through the `txn` field of the configuration:

```javascript
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

```javascript
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

```javascript
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

## Configuring args

The [`arg`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#arg-n) opcode (and friends) reads "arguments" that have been provided to the TEAL program.

You can configure the array arguments like this:

```javascript
{
    "args": [        
        "addr:7JOPVEP3AB...",
        15,
        "Hello world",

        /* As many arguments as you need ... */
    ]
}
```

## Configuring values for global fields

The [`global`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#global-f) opcode can retreive values for global fields.

Configure the values of global fields like this:

```javascript
{
    "globals": {
        "MinTxnFee": 1200,

        /* Other global values ... */
    }
}
```
## Application global state

The opcode [`app_global_get_ex`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#app_global_get_ex) retreives global state for a particular application.

You can configure global state for each application like this:

```javascript
{
    "apps": {
        "1": { /* Application with ID 1 */
            "traditionalGreeting": "Hello world",

            /* Other globals ... */
        },

        /* Other applications ... */
    }
}
```

## Configuring the "current" application

Opcodes like [`app_global_get`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#app_global_put) retreives state for the "current application".

You can define global state for the "current application" by setting an application with an ID of 0 (which is the convention for the current application in the AVM):

```javascript
{
    "apps": {
        "0": { /* The application with ID 0 is the "current application" */
            "theMeaningOfLife": 42,

            /* Other globals ... */
        },

        /* Other applications ... */
    }
}
```

### Configuring asset params

The opcode [`asset_params_get`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#asset_params_get-i) references assets by ID to retrieve parameters.

You can configure the params for each asset like this:

```javascript
{
    "assetParams": {
        "1": { /* Asset with ID 1 */
            "AssetTotal": 1500,

            /* Other fields ... */
        },

        /* Other assets ... */
    }
}
```


## Configuring accounts

Various opcodes, such as [`balance`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#balance) and [`min_balance`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#min_balance), read information from particular accounts.

For example (in TEAL):

```javascript
addr 7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224
balance // Pushes the balance of the account on the compute stack.
```

For TEAL opcodes like this to work you must provide details for each referenced account in the configuration under the `accounts` field, like this:

```javascript
{
    "accounts": {
        "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
            "balance": 10000,
            "minBalance": 300,

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

```javascript
{
    "accounts": {
        "john": {
            "balance": 10000
        }
    }
}
```

## Assets holdings

The opcode [`asset_holding_get`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#asset_holding_get-i) retreives the holdings of an asset for a particular account.

You can configure asset holdigns for an account like this:

```javascript
{
    "accounts": {
        "john": {
            "assetHoldings": {
                "1": { /* The ID of the asset */
                    "AssetBalance": 3,
                        
                    /* Other field values ... */
                },

                /* Other assets ... */
            }
        }
    }
}
```

## Application local state

The opcode [`app_local_get_ex`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#app_local_get_ex) references state that is local to a particular account and application.

You can configure the local state for an application under an account like this:

```javascript
{
    "accounts": {
        "john": {
            "appLocals": {
                "1": { /* The ID of the application */
                    "aLocal": 3,
                        
                    /* Other locals ... */
                },

                /* Other applications ... */
            }
        }
    }
}
```

Opcodes like [`app_local_get`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#app_local_get) automatically reference the "current application", which you can set using application ID 0:

```javascript
{
    "accounts": {
        "john": {
            "appLocals": {
                "0": { /* ID 0 means "current application". */
                    "aLocal": 3,
                        
                    /* Other locals ... */
                },

                /* Other applications ... */
            }
        }
    }
}
```

## Application opted in

The opcode [`app_opted_in`](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#app_opted_in) determines if an account has opted into a particular application.

You can configure whether an accout has opted in like this:

```javascript
{
    "accounts": {
        "john": {
            "appsOptedIn": [    /* Array of applications John has opted into */
                "1",            /* App ID 1 */
                "5",            /* App ID 5 */
                /* And so on ... */
            ],
        }
    }
}
```

## Putting it alltogether

To see all possible configurations [please see the TypeScript definition](https://github.com/optio-labs/teal-interpreter/blob/main/src/lib/config.ts).

Here's a more complete example configuration:

```javascript
{
    "txn": {
        "ApplicationID": 5,
        "Accounts": [
            "addr:john"
        ]
    },
    "txns": [
        {
            "ApplicationArgs": [
                "addr:john"
            ]
        }
    ],
    "application": {
        "globals": {
            "aGlobal": 38
        }
    },
    "applications": {
        "1": {
            "globals": {
                "anotherGlobal": 22
            }
        }
    },
    "assets": {
        "1": {
            "fields": {
                "AssetTotal": 5
            }
        }
    },
    "accounts": {
        "john": {
            "balance": 42,
            "locals": {
                "aLocal": 33
            },
            "applications": {
                "1": {
                    "optedIn": true,
                    "locals": {
                        "test": 53
                    }
                }
            },
            "assets": {
                "1": {
                    "fields": {
                        "AssetBalance": 3000
                    }
                }
            }
        }
    }    
}
```