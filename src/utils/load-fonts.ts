// import InterUiMedium from '../assets/fonts/Inter-Medium.woff2';
// import InterUiRegular from '../assets/fonts/Inter-Regular.woff2';
// import InterUiSemiBold from '../assets/fonts/Inter-SemiBold.woff2';
// import OpenSauceSansMedium from '../assets/fonts/opensaucesans-medium-webfont.woff2';
// import OpenSauceSansRegular from '../assets/fonts/opensaucesans-regular-webfont.woff2';
import DiatypeLight from '../assets/fonts/diatype-light.woff2';
import DiatypeMedium from '../assets/fonts/diatype-medium.woff2';
import DiatypeRegular from '../assets/fonts/diatype-regular.woff2';
import MarcheSuperPro from '../assets/fonts/marche-super-pro.woff2';

function getFontAssetPath(name: string) {
  return `url(${name})`;
}

export async function loadFonts(): Promise<void> {
  const marche = new FontFace('MarcheSuperPro', getFontAssetPath(MarcheSuperPro), {
    weight: '400',
  });

  const diatypeLight = new FontFace('Diatype', getFontAssetPath(DiatypeLight), {
    weight: '400',
  });

  const diatypeRegular = new FontFace('Diatype', getFontAssetPath(DiatypeRegular), {
    weight: '400',
  });

  const diatypeMedium = new FontFace('Diatype', getFontAssetPath(DiatypeMedium), {
    weight: '500',
  });

  await Promise.all([
    marche.load(),
    diatypeLight.load(),
    diatypeRegular.load(),
    diatypeMedium.load(),
  ]);

  document.fonts.add(marche);
  document.fonts.add(diatypeLight);
  document.fonts.add(diatypeRegular);
  document.fonts.add(diatypeMedium);
}
