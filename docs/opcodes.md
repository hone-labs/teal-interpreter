# Supported opcodes

This documents the list of opcodes supported by the TEAL interpreter.

[Listed in the same order as the official doco.](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes)

| Opcode | Supported | TEAL Version |
| - | - | - |
| err | ✔️ | 1 |
| sha256 | ✔️ | 1 |
| keccak256 | ✔️ | 1 |
| sha512_256 | ✔️ | 1 |
| ed25519verify | ✔️ | 1 |
| ecdsa_verify  | ✔️ | 5 |
| ecdsa_pk_decompress  | ✔️ | 5 |
| ecdsa_pk_recover  | ✔️ | 5 |
| + | ✔️ | 1 |
| - | ✔️ | 1 |
| / | ✔️ | 1 |
| * | ✔️ | 1 |
| < | ✔️ | 1 |
| > | ✔️ | 1 |
| <= | ✔️ | 1 |
| >= | ✔️ | 1 |
| && | ✔️ | 1 |
| \|\| | ✔️ | 1 |
| == | ✔️ | 1 |
| != | ✔️ | 1 |
| ! | ✔️ | 1 |
| len | ✔️ | 1 |
| itob | ✔️ | 1 |
| btoi | ✔️ | 1 |
| % | ✔️ | 1 |
| \| | ✔️ | 1 |
| & | ✔️ | 1 |
| ^ | ✔️ | 1 |
| ~ | ✔️ | 1 |
| mulw | ✔️ | 1 |
| addw | ✔️ | 1 |
| divmodw | ✔️ | 4 |
| intcblock uint | ✔️ | 1 |
| intc i | ✔️ | 1 |
| intc_0 | ✔️ | 1 |
| intc_1 | ✔️ | 1 |
| intc_2 | ✔️ | 1 |
| intc_3 | ✔️ | 1 |
| bytecblock bytes ... | ✔️ | 1 |
| bytec i | ✔️ | 1 |
| bytec_0 | ✔️ | 1 |
| bytec_1 | ✔️ | 1 |
| bytec_2 | ✔️ | 1 |
| bytec_3 | ✔️ | 1 |
| arg n | ✔️ | 1 |
| arg_0 | ✔️ | 1 |
| arg_1 | ✔️ | 1 |
| arg_2 | ✔️ | 1 |
| arg_3 | ✔️ | 1 |
| txn f | ✔️ | 1 |
| global f | ✔️ | 1 |
| gtxn t f | ✔️ | 1 |
| load i | ✔️ | 1 |
| store i | ✔️ | 1 |
| txna fi | ✔️ | 2 |
| gtxna t f i | ✔️ | 2 |
| gtxns f | ✔️ | 3 |
| gtxnsa f i | ✔️ | 3 |
| gload t i | ✔️ | 4 |
| gloads i | ✔️ | 4 |
| gaid i | ✔️ | 4 |
| gaids | ✔️ | 4 |
| loads | ✔️ | 5 |
| stores | ✔️ | 5 |
| bnz target | ✔️ | 1 |
| bz target | ✔️ | 2 |
| b target | ✔️ | 2 |
| return | ✔️ | 2 |
| assert | ✔️ | 2 |
| pop | ✔️ | 1 |
| dup | ✔️ | 1 |
| dup2 | ✔️ | 2 |
| dig n | ✔️ | 3 |
| swap | ✔️ | 3 |
| select | ✔️ | 3 |
| cover | ✔️ | 5 |
| uncover | ✔️ | 5 |
| concat | ✔️ | 2 |
| substring s e | ✔️ | 2 |
| substring3 | ✔️ | 2 |
| getbit | ✔️ | 3 |
| setbit | ✔️ | 3 |
| getbyte | ✔️ | 3 |
| setbyte | ✔️ | 3 |
| extract s l | ✔️ | 5 |
| extract3 | ✔️ | 5 |
| extract_uint16 | ✔️ | 5 |
| extract_uint32 | ✔️ | 5 |
| extract_uint64 | ✔️ | 5 |
| balance | ✔️ | 2 |
| app_opted_in | ✔️ | 2 |
| app_local_get | ✔️ | 2 |
| app_local_get_ex | ✔️ | 2 |
| app_global_get | ✔️ | 2 |
| app_global_get_ex | ✔️ | 2 |
| app_global_get_ex | ✔️ | 2 |
| app_local_put | ✔️ | 2 |
| app_global_put | ✔️ | 2 |
| app_local_del | ✔️ | 2 |
| app_global_del | ✔️ | 2 |
| asset_holding_get f | ✔️ | 2 |
| asset_params_get f | ✔️ | 2 |
| app_params_get f | ✔️ | 5 |
| acct_params_get f | ✔️ | 6 |
| min_balance | ✔️ | 3 |
| pushbytes byte | ✔️ | 3 |
| pushint uint | ✔️ | 3 |
| callsub target | ✔️ | 4 |
| retsub | ✔️ | 4 |
| shl | ✔️ | 4 |
| shr | ✔️ | 4 |
| sqrt | ✔️ | 4 |
| bitlen | ✔️ | 4 |
| exp | ✔️ | 4 |
| expw | ✔️ | 4 |
| bsqrt | ❌ | 6 |
| divw | ❌ | 6 |
| b+ | ✔️ | 4 |
| b- | ✔️ | 4 |
| b/ | ✔️ | 4 |
| b* | ✔️ | 4 |
| b< | ✔️ | 4 |
| b> | ✔️ | 4 |
| b<= | ✔️ | 4 |
| b>= | ✔️ | 4 |
| b== | ✔️ | 4 |
| b!= | ✔️ | 4 |
| b% | ✔️ | 4 |
| b| | ✔️ | 4 |
| b& | ✔️ | 4 |
| b^ | ✔️ | 4 |
| b~ | ✔️ | 4 |
| bzero | ✔️ | 4 |
| log | ✔️ | 5 |
| itxn_begin | ✔️ | 5 |
| itxn_field f | ✔️ | 5 |
| itxn_submit | ✔️ | 5 |
| itxn f | ✔️ | 5 |
| itxna f i | ✔️ | 5 |
| itxn_next | ✔️ | 6 |
| gitxn t f | ❌ | 6 |
| gitxna t f i | ❌ | 6 |
| txnas f | ✔️ | 5 |
| gtxnas t f | ✔️ | 5 |
| gtxnsas f | ✔️ | 5 |
| args | ✔️ | 5 |
| itxnas f | ❌ | 6 |
| gitxnas t f | ❌ | 6 |