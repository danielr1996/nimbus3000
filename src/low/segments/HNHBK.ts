import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef, DataElementGroup} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty, DataElement} from "../dataelements/mod.ts";
import {HBCI_VERSION, INITIAL_DIALOG_ID} from "../dataelements/constants.ts";

/**
 *
 * For more information see volume [Formals] Section B.5.2 "Nachrichtenkopf" of the FinTS 3.0 specification
 */
export class HNHBK extends Segment<HNHBK> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public messageLength: Digit,
        public hbciVersion: Numeric = HBCI_VERSION,
        public dialogId: Alphanumeric = new Alphanumeric(`0`),
        public msgNo: Numeric,
        public msgRef?: MessageRef,
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HNHBK'), segNo, new Numeric(3))
    }

    deserialize(str: string): Segment<HNHBK> {
        // @ts-ignore
        const [{segNo},messageLength, hbciVersion, dialogId, msgNo, msgRef] = Segment.deserializeDataElementsOrDataElementGroups(str, [SegmentHead, Digit, Numeric, Alphanumeric, Numeric, MessageRef]);
        // @ts-ignore
        return new HNHBK(segNo, messageLength, hbciVersion, dialogId, msgNo, msgRef);
    }

    serialize(): string {
        const dataElements = [this.head, this.messageLength, this.hbciVersion, this.dialogId, this.msgNo, this.msgRef ?? new Empty()];
        return Segment.serializeDataElementsOrDataElementGroups(dataElements);
    }
}
