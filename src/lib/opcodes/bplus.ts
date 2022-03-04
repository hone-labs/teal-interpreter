import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class BPlus extends Opcode {

    //
    // Pops bytes from the stack converts them to a int (possibly bigger than a 64 bit int).
    //
    private popBytesAsInt(context: IExecutionContext): bigint {
        const bytes = this.popBytes(context);       
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
    private pushIntAsBytes(context: IExecutionContext, value: bigint): void {
        if (value === BigInt(0)) {
            this.pushBytes(context, new Uint8Array([]));
            return;
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
    
        this.pushBytes(context, array);
    }
    
    execute(context: IExecutionContext): void {
        const b = this.popBytesAsInt(context);
        const a = this.popBytesAsInt(context);
        this.pushIntAsBytes(context, a + b);
    }
}
