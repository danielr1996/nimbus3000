import {Segment} from "./segment.ts";
import {SegmentHead, KIK} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric} from "../dataelements/mod.ts";
import {SYSTEM_ID, SYSTEM_STATE} from "../dataelements/constants.ts";

/**
 *
 * For more information see volume [Formals] Section C.3.1.2 "Segment: Identifikation" of the FinTS 3.0 specification
 */
export class HKIDN extends Segment<HKIDN> {
    head: SegmentHead;

    constructor(
         segNo: Numeric,
        public kik: KIK,
        /**
         * The username you use to login to your banks website
         */
        public customerId: Alphanumeric,
        public systemId = SYSTEM_ID,
        public customerSystemState = SYSTEM_STATE

    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HKIDN'), segNo, new Numeric(2))
    }

    deserialize(str: string): HKIDN {
        return this;
    }

    serialize(): string {
        return Segment.serializeDataElementsOrDataElementGroups([this.head, this.kik,this.customerId,this.systemId,this.customerSystemState]);
    }
}
