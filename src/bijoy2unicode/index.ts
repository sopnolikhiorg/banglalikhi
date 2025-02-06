import banglaAlphabets from "../common/bangladeshi-bangla-alphabets";
import joinedAlphabets from "../common/bangladeshi-joined-alphabets";
import numberAlphabets from "../common/bangladeshi-number-alphabets";
import signAlphabets from "../common/bangladeshi-sign-alphabets";
import vowelAlphabets from "../common/bangladeshi-vowel-alphabets";
import vowelSignAlphabets from "../common/bangladeshi-vowel-sign-alphabets";
import mappingMap from "../common/mapping/re-arrangement-map";

const bijoyConverter = (text: string): string => {
  const mappings = [
    ...banglaAlphabets.map(([k, v]) => ({ key: k, value: v })),
    ...vowelAlphabets.map(([k, v]) => ({ key: k, value: v })),
    ...vowelSignAlphabets.map(([k, v]) => ({ key: k, value: v })),
    ...numberAlphabets.map(([k, v]) => ({ key: k, value: v })),
    ...signAlphabets.map(([k, v]) => ({ key: k, value: v })),
    ...joinedAlphabets.map(([k, v]) => ({ key: k, value: v })),
  ];

  let convertedText = "";
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    let nextChar = text[i + 1] || "";

    for (const mapping of mappings) {
      if (mapping.key === char + nextChar) {
        convertedText += mapping.value;
        i += 2;
      } else if (mapping.key === char) {
        convertedText += mapping.value;
        i += 1;
      }
    }
  }

  return convertedText;
};

export default function BijoyToUnicode(text: string): string {
  const mappings = mappingMap.map(([k, v]) => ({ key: k, value: v }));

  let remappingText = "";

  // Bijoy to Unicode remapping
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    for (const mapping of mappings) {
      if (mapping.key === nextChar) {
        remappingText += char + nextChar;
        i++;
      } else if (mapping.key === char) {
        remappingText += nextChar;
        remappingText += char;
        i++;
      }
    }
  }

  return bijoyConverter(remappingText);
}
