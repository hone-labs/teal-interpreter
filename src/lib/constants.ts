//
// Named integer constants.
//
// https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/#named-integer-constants
//

export const constants: any = {
    // https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/#oncomplete
    NoOp: 0,
    OptIn: 1,
    CloseOut: 2,
    ClearState: 3,
    UpdateApplication: 4,
    DeleteApplication: 5,

    // https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/#typeenum-constants
    pay: 1,
    keyreg: 2,
    acfg: 3,
    axfer: 4,
    afrz: 5,
    appl: 6,
};