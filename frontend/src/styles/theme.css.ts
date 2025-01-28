import {
  amber,
  green,
  limeDark,
  limeDarkA,
  oliveDark,
  orangeDark,
  redA,
  redDark,
} from "@radix-ui/colors";
import { createGlobalTheme } from "@vanilla-extract/css";

const primary = limeDark;
const primaryA = limeDarkA;
const gray = oliveDark;
const error = redDark;
const errorA = redA;
const orange = orangeDark;

export const vars = createGlobalTheme(":root", {
  color: {
    base: {
      white: "#fff",
    },

    primary1: primary.lime1,
    primary2: primary.lime2,
    primary3: primary.lime3,
    primary4: primary.lime4,
    primary5: primary.lime5,
    primary6: primary.lime6,
    primary7: primary.lime7,
    primary8: primary.lime8,
    primary9: primary.lime9,
    primary10: primary.lime10,
    primary11: primary.lime11,
    primary12: primary.lime12,
    primaryA1: primaryA.limeA1,
    primaryA2: primaryA.limeA2,
    primaryA3: primaryA.limeA3,
    primaryA4: primaryA.limeA4,
    primaryA5: primaryA.limeA5,
    primaryA6: primaryA.limeA6,
    primaryA7: primaryA.limeA7,
    primaryA8: primaryA.limeA8,
    primaryA9: primaryA.limeA9,
    primaryA10: primaryA.limeA10,
    primaryA11: primaryA.limeA11,
    primaryA12: primaryA.limeA12,

    gray1: gray.olive1,
    gray2: gray.olive2,
    gray3: gray.olive3,
    gray4: gray.olive4,
    gray5: gray.olive5,
    gray6: gray.olive6,
    gray7: gray.olive7,
    gray8: gray.olive8,
    gray9: gray.olive9,
    gray10: gray.olive10,
    gray11: gray.olive11,
    gray12: gray.olive12,

    success1: green.green1,
    success2: green.green2,
    success3: green.green3,
    success4: green.green4,
    success5: green.green5,
    success6: green.green6,
    success7: green.green7,
    success8: green.green8,
    success9: green.green9,
    success10: green.green10,
    success11: green.green11,
    success12: green.green12,

    warning1: amber.amber1,
    warning2: amber.amber2,
    warning3: amber.amber3,
    warning4: amber.amber4,
    warning5: amber.amber5,
    warning6: amber.amber6,
    warning7: amber.amber7,
    warning8: amber.amber8,
    warning9: amber.amber9,
    warning10: amber.amber10,
    warning11: amber.amber11,
    warning12: amber.amber12,

    orange1: orange.orange1,
    orange2: orange.orange2,
    orange3: orange.orange3,
    orange4: orange.orange4,
    orange5: orange.orange5,
    orange6: orange.orange6,
    orange7: orange.orange7,
    orange8: orange.orange8,
    orange9: orange.orange9,
    orange10: orange.orange10,
    orange11: orange.orange11,
    orange12: orange.orange12,

    error1: error.red1,
    error2: error.red2,
    error3: error.red3,
    error4: error.red4,
    error5: error.red5,
    error6: error.red6,
    error7: error.red7,
    error8: error.red8,
    error9: error.red9,
    error10: error.red10,
    error11: error.red11,
    error12: error.red12,
    errorA1: errorA.redA1,
    errorA2: errorA.redA2,
    errorA3: errorA.redA3,
    errorA4: errorA.redA4,
    errorA5: errorA.redA5,
    errorA6: errorA.redA6,
    errorA7: errorA.redA7,
    errorA8: errorA.redA8,
    errorA9: errorA.redA9,
    errorA10: errorA.redA10,
    errorA11: errorA.redA11,
    errorA12: errorA.redA12,
  },
  shadow: {
    xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    sm: "0px 2px 4px 3px rgb(9 10 6 / 20%), 0px 1px 3px 0px rgb(33 34 32 / 10%)",
  },
});
