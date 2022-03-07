import { IExecutionContext } from "../context";
import { ByteBinary } from "./byte-binary-operator";

export class ByteOr extends ByteBinary {

    execute(context: IExecutionContext): void {
        const result = this.intA | this.intB;

        // https://developer.algorand.org/docs/reference/teal/specification/#arithmetic-logic-and-cryptographic-operations
        const resultBytes = this.intToBytes(result);
        const max = Math.max(this.bytesA.length, this.bytesB.length);
        const padded = new Uint8Array(Math.max(0, max - resultBytes.length)).fill(0);
        const merged = new Uint8Array(max);
        merged.set(padded);
        merged.set(resultBytes, padded.length);
        this.pushBytes(context, merged);
    }
}
