import {Segment} from "./mod.ts";
import {SegmentHead, MessageRef, DataElementGroup, Response} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric, Digit, Empty, DataElement} from "../dataelements/mod.ts";

/**
 *
 * For more information see volume [Formals] Section B.7.2 "Rückmeldung zur Gesamtnachricht" of the FinTS 3.0 specification
 */
export class HIRMG extends Segment<HIRMG> {
    public head: SegmentHead;

    constructor(
        segNo: Numeric,
        public responses: Response[],
    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HIRMG'), segNo, new Numeric(2))
    }

    deserialize(str: string): Segment<HIRMG> {
        // @ts-ignore
        const [{segNo}, ...responses] = Segment.deserializeDataElementsOrDataElementGroups(str, [SegmentHead], Response);
        // @ts-ignore
        return new HIRMG(segNo, responses);
    }

    serialize(): string {
        throw new Error(`HIRMG cannot be serialized!`)
    }
}
