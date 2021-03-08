import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty} from "../dataelements/mod.ts";
import {SECREF} from "../dataelements/constants.ts";

/**
 *
 * For more information see volume [HBCI] Section B.5.1 "Signaturkopf" of the FinTS 3.0 specification
 */
export class HNSHA extends Segment<HNSHA> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public pin: string,
        public secRef: Alphanumeric = SECREF,
        public validationResult?: Alphanumeric,
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNSHA'), segNo, new Numeric(2))
    }

    deserialize(str: string): HNSHA {
        return this;
    }

    serialize(): string {
        return `HNSHA:${this.head.segNo.serialize()}:2+${this.secRef.serialize()}++${this.pin}`
    }
}
