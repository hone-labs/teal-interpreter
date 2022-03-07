import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export abstract class ByteBinary extends Opcode {

    //
    // Arguments for the binary operator popped from the compute stack.
    //
    protected bytesA!: Uint8Array;
    protected bytesB!: Uint8Array;
    protected intA!: bigint;
    protected intB!: bigint;

    //
    // Pops bytes from the stack converts them to a int (possibly bigger than a 64 bit int).
    //
    protected bytesToInt(bytes: Uint8Array): bigint {
        if (bytes.length === 0) { 
            return BigInt(0);
        }

        const hex = Array.from(bytes).map(value => {
            let hex = value.toString(16);
            if (hex.length % 2) { 
                hex = '0' + hex;
            } 
            return hex;
        });

        return BigInt('0x' + hex.join(''));
    }

    //
    // Converts an int to bytes and pushes it on the stack.
    //
    protected intToBytes(value: bigint): Uint8Array {
        if (value === BigInt(0)) {
            return new Uint8Array([]);
        };

        let hex = value.toString(16);
        if (hex.length % 2) { 
            hex = '0' + hex;            
        } 

        const length = hex.length / 2;
        const array = new Uint8Array(length);

        for (let i = 0, j = 0; i < length; i += 1, j += 2) {
            array[i] = parseInt(hex.slice(j, j + 2), 16);
        }
    
        return array;
    }
    
    //
    // Converts an int to bytes and pushes it on the stack.
    //
    protected pushIntAsBytes(context: IExecutionContext, value: bigint): void {
        this.pushBytes(context, this.intToBytes(value));
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.bytesB = this.popBytes(context);
        this.intB = this.bytesToInt(this.bytesB);

        this.bytesA = this.popBytes(context);
        this.intA = this.bytesToInt(this.bytesA);
    }
   
}
