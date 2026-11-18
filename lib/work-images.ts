import alvin from '@/public/images/alvin-lucier-hero_display_horizontal.jpg'
import awave from '@/public/images/AWP-LOGO-WHITE.svg'
import changes from '@/public/images/changes.jpg'
import electricMelon from '@/public/images/CTA-Confuse-a-Tron-Machine-MCaudill.jpg'
import emy from '@/public/images/matador.jpg'
import faithfully from '@/public/images/detour_photo_by_werder4.jpg'
import ghostses from '@/public/images/AWP007-front_1000.jpg'
import kaosKids from '@/public/images/robot-youth-SFAA-Feb262024-Newspaper_695.jpg'
import makingLab from '@/public/images/making-lab.jpg'
import makingLabSpace from '@/public/images/mdp_making_lab_03-940x520.jpg'
import radios from '@/public/images/radios_cover_v2.jpg'
import rainforest from '@/public/images/Southland-Rainforest-Rauch-Web-0379_800.jpg'
import tradeSchool from '@/public/images/TS-still-here.jpg'
import yonTiVizit from '@/public/images/AWP011-web-front.jpg'
import type { StaticImageData } from 'next/image'

// Static imports give Next.js the real image dimensions without runtime file reads.
export const WORK_IMAGES: Record<
  string,
  { image: StaticImageData; alt: string }
> = {
  'alvin-lucier-hero_display_horizontal.jpg': {
    image: alvin,
    alt: 'Alvin Lucier',
  },
  'AWP-LOGO-WHITE.svg': { image: awave, alt: 'a wave' },
  'changes.jpg': { image: changes, alt: 'James Tenney: Changes' },
  'CTA-Confuse-a-Tron-Machine-MCaudill.jpg': {
    image: electricMelon,
    alt: 'Electric Melon workshop',
  },
  'matador.jpg': { image: emy, alt: 'Experimental Music Yearbook' },
  'detour_photo_by_werder4.jpg': { image: faithfully, alt: 'Faithfully' },
  'AWP007-front_1000.jpg': { image: ghostses, alt: 'ghostses album artwork' },
  'robot-youth-SFAA-Feb262024-Newspaper_695.jpg': {
    image: kaosKids,
    alt: 'KAOS Kids',
  },
  // Turbopack doesn't recognize uppercase .JPG imports. Keep the original public
  // URL and its measured dimensions instead of renaming an existing asset.
  'DSC00451_1000.JPG': {
    image: { src: '/images/DSC00451_1000.JPG', width: 1000, height: 666 },
    alt: 'Laboratwa Elektronik Matènwa',
  },
  'making-lab.jpg': { image: makingLab, alt: 'The Making Lab' },
  'mdp_making_lab_03-940x520.jpg': {
    image: makingLabSpace,
    alt: 'The Making Lab workspace',
  },
  'radios_cover_v2.jpg': { image: radios, alt: 'RADIOS album artwork' },
  'Southland-Rainforest-Rauch-Web-0379_800.jpg': {
    image: rainforest,
    alt: 'Rainforest IV',
  },
  'TS-still-here.jpg': { image: tradeSchool, alt: 'Trade School' },
  'AWP011-web-front.jpg': {
    image: yonTiVizit,
    alt: 'Yon Ti Vizit album artwork',
  },
}
