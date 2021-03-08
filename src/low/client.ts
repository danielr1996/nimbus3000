import {Message} from "./message.ts";

type DebugOptions = {
    message?: boolean,
    serialized?: boolean,
    encoded?: boolean,
}
export type ClientOptions = {
    debug?: {
        send?: DebugOptions,
        recv?: DebugOptions,
    }
}

export class Client {
    constructor(public url: string, public options?: ClientOptions) {
    }

    public async send(message: Message): Promise<any[]> {
        const serialized = message.serialize();
        const encoded = btoa(serialized);
        this.debug(message, serialized, encoded, this.options?.debug?.send);
        const responseEncoded = await (await fetch(this.url, {
            method: `POST`,
            body: encoded
        })).text();
        const responseSerialized = atob(responseEncoded)
        const responseMessage = new Message().deserializeArray(responseSerialized);
        // this.debug(responseMessage, responseSerialized, responseEncoded, this.options?.debug?.recv);
        return responseMessage;
    }

    private debug(message: Message, serialized: string, encoded: string, debugOptions?: DebugOptions) {
        if (debugOptions?.message) {
            console.log(message);
        }
        if (debugOptions?.serialized) {
            console.log(serialized);
        }
        if (debugOptions?.encoded) {
            console.log(encoded);
        }
    }
}
