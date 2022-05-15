import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#F36C1D', // orange
  secondary: '#fff', // white
  button: '#CE873D',
  third: '#000', //black
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'Rancho-Regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
    color: COLORS.primary,
  },
  h1: {
    fontFamily: 'Rancho-Regular',
    fontSize: SIZES.h1,
    lineHeight: 40,
    color: COLORS.primary,
  },
  h2: {
    fontFamily: 'Mulish-Bold',
    fontSize: SIZES.h2,
    lineHeight: 30,
    color: COLORS.primary,
  },
  h3: {
    fontFamily: 'Mulish-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22,
    color: COLORS.primary,
  },
  h4: {
    fontFamily: 'Mulish-Bold',
    fontSize: SIZES.h4,
    lineHeight: 22,
    color: COLORS.primary,
  },

  body1: {
    fontFamily: 'Mulish-Italic',
    fontSize: SIZES.body1,
    lineHeight: 36,
    color: COLORS.third,
  },
  body2: {
    fontFamily: 'Mulish-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
    color: COLORS.third,
  },
  body3: {
    fontFamily: 'Mulish-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: COLORS.third,
  },
  body4: {
    fontFamily: 'Mulish-Regular',
    fontSize: SIZES.body4,

    color: COLORS.third,
  },
  body5: {
    fontFamily: 'Mulish-Regular',
    fontSize: SIZES.body5,

    color: COLORS.third,
  },
  body6: {
    fontFamily: 'Mulish-Regular',
    fontSize: SIZES.body6,

    color: COLORS.third,
  },
};
