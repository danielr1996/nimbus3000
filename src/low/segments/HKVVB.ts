import {Segment} from "./segment.ts";
import {SegmentHead, KIK} from "../dataelementsgroups/mod.ts";
import {Numeric, Alphanumeric} from "../dataelements/mod.ts";
import {LANG, SYSTEM_ID, SYSTEM_STATE} from "../dataelements/constants.ts";

/**
 *
 * For more information see volume [Formals] Section C.3.1.3 "Segment: Verarbeitungsvorbereitung" of the FinTS 3.0 specification
 */
export class HKVVB extends Segment<HKVVB> {
    head: SegmentHead;

    constructor(
        segNo: Numeric,
        public bpdVersion: Numeric,
        public updVersion: Numeric,
        public lang = LANG,
        /**
         * The ProductID as registered with the "Deutsche Kreditwirtschaft"
         * https://www.hbci-zka.de/register/prod_register.htm
         */
        public productId: Alphanumeric,
        public productVersion: Alphanumeric,

    ) {
        super();
        this.head = new SegmentHead(new Alphanumeric('HKVVB'), segNo, new Numeric(3))
    }

    deserialize(str: string): HKVVB {
        return this;
    }

    serialize(): string {
        return Segment.serializeDataElementsOrDataElementGroups([this.head, this.bpdVersion,this.updVersion,this.lang,this.productId, this.productVersion]);
    }
}
