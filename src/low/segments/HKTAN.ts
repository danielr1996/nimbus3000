import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty} from "../dataelements/mod.ts";

/**
 *
 * For more information see volume [HBCI] Section B.5.1 "Signaturkopf" of the FinTS 3.0 specification
 */
export class HKTAN extends Segment<HKTAN> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        // public secProfile,
        // public secFunction,
        // public secRef,
        // public secDomain,
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HKTAN'), segNo, new Numeric(4))
    }

    deserialize(str: string): HKTAN {
        return this;
    }

    serialize(): string {
        // const dataElements = [this.head, this.messageLength, this.hbciVersion, this.dialogId, this.msgNo, this.msgRef ?? new Empty()];
        // return Segment.serializeDataElementsOrDataElementGroups(dataElements);
        return `HKTAN:${this.head.segNo.serialize()}:6+4+HKIDN`
    }
}
