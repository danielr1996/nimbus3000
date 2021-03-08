import {Serializable} from "./serializable.ts";
import {Segment, HNHBK, fromString} from "./segments/mod.ts";
import {Digit} from "./dataelements/digit.ts";

/**
 * Combination of Segments
 * For more information see volume [Formals] Section B.2 "Nachrichtenelemente" of the FinTS 3.0 specification
 */
export class Message implements Serializable<Message> {
    constructor(public segments: Segment<unknown>[] = []) {
    }

    deserialize(str: string): Message {
        /**
         * Filter institute specfic segemts (starting with D) that we don't support
         */
            // @ts-ignore
        const rawSegments = str.split(`'`).filter(seg => !seg.startsWith('D'));
        const segments = rawSegments
            .map(seg => [seg.split(':')[0], seg])
            // @ts-ignore
            .map(([className, seg]) => {
                    return fromString(className).deserialize(seg)
            }).filter(e => e !== null);
        return new Message(segments);
    }
    deserializeArray(str: string): any[] {
        // @ts-ignore
        return str.split(`'`).filter(s=>!s.startsWith('D')).map(s=>s.split(`+`).map(s=>s.split(`:`)));
    }

    serialize(): string {
        // @ts-ignore
        const [head, ...rest]: [HNHBK] = this.segments;
        if (head.head.type.str !== `HNHBK`) {
            console.error(`The first segment in a message must be HNHBK`);
            //@ts-ignore
            Deno.exit(-1);
        }
        const length = Message.serializeSegments(this.segments).length;
        head.messageLength = new Digit(length);

        return Message.serializeSegments([head, ...rest]);
    }

    /**
     * Serializes an array of DataElements or DataElementGroups
     * For more information see volume [Formals] Section H 1.2 "Nachrichtenaufbau" of the FinTS 3.0 specification
     * @param segments
     */
    private static serializeSegments(segments: Segment<unknown>[]): string {
        return segments.map(seg => seg.serialize()).join(`'`) + `'`;
    }
}
