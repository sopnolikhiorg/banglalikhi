import BijoyToUnicode from "./bijoy2unicode";
import UnicodeToBijoy from "./unicode2bijoy";

export class BanglaLikhi {
  static bijoyToUnicode(bijoyText: string): string {
    return BijoyToUnicode(bijoyText);
  }
  static unicodeToBijoy(unicodeText: string): string {
    return UnicodeToBijoy(unicodeText);
  }
}
