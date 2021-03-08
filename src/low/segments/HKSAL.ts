
import {Segment} from "./segment.ts";
import {SegmentHead} from "../dataelementsgroups/segmenthead.ts";
import {Numeric} from "../dataelements/numeric.ts";
import {Alphanumeric} from "../dataelements/alphanumeric.ts";

export class HKSAL extends Segment<HKSAL> {
    head: SegmentHead;

    constructor(
        segNo: Numeric,
        public blz: Alphanumeric,
        public account: Alphanumeric

    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HKSAL'), segNo, new Numeric(7))
    }

    deserialize(str: string): HKSAL {
        return this;
    }

    serialize(): string {
        return `HKSAL:${this.head.segNo.serialize()}:5+${this.account.serialize()}::280:${this.blz.serialize()}+N++`;
    }
}
