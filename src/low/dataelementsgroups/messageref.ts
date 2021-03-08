/**
 *
 * For more information see volume [Formals] Section G "Bezugsnachricht" of the FinTS 3.0 specification
 */
import {DataElementGroup} from "./dataelementgroup.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";

export class MessageRef extends DataElementGroup<MessageRef> {
    constructor(
        public dialogId: Alphanumeric,
        public msgNo: Numeric,
    ) {
        super();
    }

    deserialize(str: string): MessageRef {
        // @ts-ignore
        const [dialogId, msgNo] = DataElementGroup.deserializeDataElements(str, [Alphanumeric,Numeric])
        // @ts-ignore
        return new MessageRef(dialogId, msgNo);
    }

    serialize(): string {
        return DataElementGroup.serializeDataElements([this.dialogId, this.msgNo])
    }
}
