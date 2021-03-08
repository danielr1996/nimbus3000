import type Deno
    from "https://gist.githubusercontent.com/danielr1996/f961b8129f5eb0e658ecb82d23b3371d/raw/50d0638b404e3b0f1009c9acbeb14b4661fdab3c/lib.deno.d.ts";
import {deserialize} from "./HIRMG2.ts";

Deno.test("deserialize", () => {
    const de = deserialize(
        // [
        // `HNHBK:1:3+000000011094+300+580729850607=660331861852BL7L=+1+580729850607=660331861852BL7L=:1'`,
        `HIRMG:2:2+3060::Bitte beachten Sie die enthaltenen Warnungen/Hinweise.+0100::Dialog beendet.+HIRMG:2:2'`,
        // `HIRMS:3:2:3+3050::BPD nicht mehr aktuell, aktuelle Version enthalten.+0020::Informationen fehlerfrei entgegengenommen.'`,
        // `HIBPA:4:3:3+9+280:76050101+Sparkasse Nürnberg+3+1+300'`,
        // `HIKOM:5:4:3+280:76050101+1+3:banking-by1.s-fints-pt-by.de/fints30+2:banking-by1.s-fints-pt-by.de::MIM:1'`,
        // `HISHV:6:3:3+N+DDV:1+PIN:1'`
    // ].join('')
);
    // console.log(de)
});
