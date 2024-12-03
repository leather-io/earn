import InterUiMedium from '../assets/fonts/Inter-Medium.woff2';
import InterUiRegular from '../assets/fonts/Inter-Regular.woff2';
import InterUiSemiBold from '../assets/fonts/Inter-SemiBold.woff2';
import OpenSauceSansMedium from '../assets/fonts/opensaucesans-medium-webfont.woff2';
import OpenSauceSansRegular from '../assets/fonts/opensaucesans-regular-webfont.woff2';
import DiatypeLight from '../assets/fonts/diatype-light.woff2';
import DiatypeRegular from '../assets/fonts/diatype-regular.woff2';
import DiatypeMedium from '../assets/fonts/diatype-medium.woff2';
import MarchePro from '../assets/fonts/marche-super-pro.woff2';

function getFontAssetPath(name: string) {
  return `url(${name})`;
}

export async function loadFonts(): Promise<void> {
  const interRegular = new FontFace('Inter', getFontAssetPath(InterUiRegular), {
    weight: '400',
  });
  const interMedium = new FontFace('Inter', getFontAssetPath(InterUiMedium), {
    weight: '500',
  });
  const interSemiBold = new FontFace('Inter', getFontAssetPath(InterUiSemiBold), {
    weight: '600',
  });
  const openSauceRegular = new FontFace('Open Sauce', getFontAssetPath(OpenSauceSansRegular), {
    weight: '400',
  });

  const openSauceMedium = new FontFace('Open Sauce', getFontAssetPath(OpenSauceSansMedium), {
    weight: '500',
  });

  const diatypeLight = new FontFace('Diatype', getFontAssetPath(DiatypeLight), {
    weight: '300',
  });
  const diatypeRegular = new FontFace('Diatype', getFontAssetPath(DiatypeRegular), {
    weight: '400',
  });
  const diatypeMedium = new FontFace('Diatype', getFontAssetPath(DiatypeMedium), {
    weight: '500',
  });
  const marchePro = new FontFace('Marche Pro', getFontAssetPath(MarchePro), {
    weight: '400',
  });

  await Promise.all([
    interRegular.load(),
    interMedium.load(),
    interSemiBold.load(),
    openSauceRegular.load(),
    openSauceMedium.load(),
    diatypeLight.load(),
    diatypeRegular.load(),
    diatypeMedium.load(),
    marchePro.load(),
  ]);

  document.fonts.add(interRegular);
  document.fonts.add(interMedium);
  document.fonts.add(interSemiBold);
  document.fonts.add(openSauceRegular);
  document.fonts.add(openSauceMedium);
  document.fonts.add(diatypeLight);
  document.fonts.add(diatypeRegular);
  document.fonts.add(diatypeMedium);
  document.fonts.add(marchePro);
}
