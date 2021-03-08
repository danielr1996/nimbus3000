/**
 *
 * For more information see volume [Formals] Section R "Rückmeldung" of the FinTS 3.0 specification
 */
import {DataElementGroup} from "./mod.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Empty} from "../dataelements/empty.ts";
import {Digit} from "../dataelements/digit.ts";

export class Response extends DataElementGroup<Response>{
    constructor(
        public code: Digit,
        public deRef: Alphanumeric,
        public text: Alphanumeric,
        public param?: Alphanumeric,
    ) {
        super();
    }

    deserialize(str: string): Response {
        //@ts-ignore
        return DataElementGroup.deserializeDataElements(str, [Alphanumeric,Alphanumeric,Alphanumeric,Alphanumeric]);
    }

    serialize(): string {
        throw new Error(`Response cannot be serialized!`)
    }
}
