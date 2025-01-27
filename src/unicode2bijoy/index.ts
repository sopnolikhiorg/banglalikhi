import banglaAlphabets from "../common/bangladeshi-bangla-alphabets";
import joinedAlphabets from "../common/bangladeshi-joined-alphabets";
import numberAlphabets from "../common/bangladeshi-number-alphabets";
import signAlphabets from "../common/bangladeshi-sign-alphabets";
import vowelAlphabets from "../common/bangladeshi-vowel-alphabets";
import vowelSignAlphabets from "../common/bangladeshi-vowel-sign-alphabets";
import mappingMap from "../common/mapping/re-arrangement-map";

const unicodeConverter = (text: string): string => {
  const mappings = [
    ...banglaAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...vowelAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...vowelSignAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...numberAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...signAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...joinedAlphabets.map(([k, v]) => ({ key: v, value: k })),
  ];

  let convertedText = "";
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    let nextChar = text[i + 1] || "";
    let found = false;

    // Handle joined alphabets
    for (const mapping of mappings) {
      if (mapping.key === char + nextChar) {
        convertedText += mapping.value;
        i += 2;
        found = true;
        break;
      } else if (mapping.key === char) {
        convertedText += mapping.value;
        i++;
        found = true;
        break;
      }
    }

    if (!found) {
      convertedText += char;
      i++;
    }
  }

  return convertedText;
};

export default function UnicodeToBijoy(text: string): string {
  const mappings = mappingMap.map(([k, v]) => ({ key: v, value: k }));

  let remappingText = "";

  // Bijoy to Unicode remapping
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    let found = false;

    for (const mapping of mappings) {
      if (mapping.key === nextChar) {
        remappingText += char + nextChar;
        i++;
        found = true;
        break;
      } else if (mapping.key === char) {
        remappingText += nextChar;
        remappingText += char;
        i++;
        found = true;
        break;
      }
    }

    if (!found) {
      remappingText += char;
    }
  }

  return unicodeConverter(remappingText);
}
