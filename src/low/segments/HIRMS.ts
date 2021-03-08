import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef, DataElementGroup, Response} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty, DataElement} from "../dataelements/mod.ts";

/**
 *
 * For more information see volume [Formals] Section B.7.3 "Rückmeldung zu Segmenten" of the FinTS 3.0 specification
 */
export class HIRMS extends Segment<HIRMS> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public responses: Response[],
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HIRMS'), segNo, new Numeric(2))
    }

    deserialize(str: string): Segment<HIRMS> {
        // @ts-ignore
        const [{segNo}, ...responses] = Segment.deserializeDataElementsOrDataElementGroups(str, [SegmentHead], Response);
        // @ts-ignore
        return new HIRMS(segNo, responses);
    }

    serialize(): string {
        throw new Error(`HIRMS cannot be serialized!`)
    }
}
