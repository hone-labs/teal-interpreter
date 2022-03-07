import { IExecutionContext } from "../context";
import { ByteBinary } from "./byte-binary-operator";

export class BMul extends ByteBinary {

    execute(context: IExecutionContext): void {
        this.pushIntAsBytes(context, this.a * this.b);
    }
}
