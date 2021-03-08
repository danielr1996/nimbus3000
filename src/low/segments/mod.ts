// @ts-ignore
import {match, Constructable} from "https://raw.githubusercontent.com/danielr1996/match/main/match.ts";
import {Segment} from "./segment.ts";
import {HKIDN} from "./HKIDN.ts";
import {HNHBK} from './HNHBK.ts';
import {HNHBS} from './HNHBS.ts';
import {HKVVB} from './HKVVB.ts';
import {HIRMG} from './HIRMG.ts';
import {HIRMS} from './HIRMS.ts';
import {HIBPA} from './HIBPA.ts';
import {GENSEG} from "./GENSEG.ts";

export {Segment, HKVVB, HKIDN, HNHBK, HNHBS,HIRMG, GENSEG, HIRMS,HIBPA}

export const fromString = (str: string): Segment<unknown> => {
    return Object.create( match<Constructable<Segment<unknown>>>([
        [str === 'HNHBK', HNHBK],
        [str === 'HIRMG', HIRMG],
        [str === 'HIRMS', HIRMS],
        [str === 'HIBPA', HIBPA],
        [true, GENSEG],
    ]).prototype)
}
