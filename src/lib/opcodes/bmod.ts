import { IExecutionContext } from "../context";
import { ByteBinary } from "./byte-binary-operator";

export class BMod extends ByteBinary {

    execute(context: IExecutionContext): void {
        this.pushIntAsBytes(context, this.intA % this.intB);
    }
}
