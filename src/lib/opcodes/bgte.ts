import { IExecutionContext } from "../context";
import { ByteBinary } from "./byte-binary-operator";

export class Bgte extends ByteBinary {

    execute(context: IExecutionContext): void {
        this.pushInt(context, this.intA >= this.intB ? BigInt(1) : BigInt(0));
    }
}
