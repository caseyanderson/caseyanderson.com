import alvin from '@/public/images/alvin-lucier-hero_display_horizontal.jpg'
import awave from '@/public/images/AWP-LOGO-WHITE.svg'
import changes from '@/public/images/changes.jpg'
import electricMelon from '@/public/images/CTA-Confuse-a-Tron-Machine-MCaudill.jpg'
import emy from '@/public/images/matador.jpg'
import faithfully from '@/public/images/detour_photo_by_werder4.jpg'
import ghostses from '@/public/images/AWP007-front_1000.jpg'
import kaosKids from '@/public/images/robot-youth-SFAA-Feb262024-Newspaper_695.jpg'
import sankofaRed from '@/public/images/sankofa-red-vision-reopening.jpg'
import makingLab from '@/public/images/making-lab.jpg'
import makingLabSpace from '@/public/images/mdp_making_lab_03-940x520.jpg'
import radios from '@/public/images/radios_cover_v2.jpg'
import rainforest from '@/public/images/Southland-Rainforest-Rauch-Web-0379_800.jpg'
import tradeSchool from '@/public/images/TS-still-here.jpg'
import yonTiVizit from '@/public/images/AWP011-web-front.jpg'
import type { StaticImageData } from 'next/image'
import masksCover from '@/public/images/illuminated-heritage-masks/dsc05303.jpg'
import masksMaterials from '@/public/images/illuminated-heritage-masks/00-dsc04879.jpg'
import masksCircuitHelp from '@/public/images/illuminated-heritage-masks/0-dsc05005.jpg'
import masksDemonstration from '@/public/images/illuminated-heritage-masks/dsc04865.jpg'
import masksDecorated from '@/public/images/illuminated-heritage-masks/dsc04870.jpg'
import masksLed from '@/public/images/illuminated-heritage-masks/dsc04920.jpg'
import masksTable from '@/public/images/illuminated-heritage-masks/dsc04983.jpg'
import masksRoom from '@/public/images/illuminated-heritage-masks/dsc05118.jpg'
import masksFinished from '@/public/images/illuminated-heritage-masks/dsc05263.jpg'

// Static imports give Next.js the real image dimensions without runtime file reads.
export const WORK_IMAGES: Record<
  string,
  { image: StaticImageData; alt: string }
> = {
  'illuminated-heritage-masks/dsc05303.jpg': {
    image: masksCover,
    alt: 'A participant holds up a white mask with glowing LEDs that cast red light across their face',
  },
  'illuminated-heritage-masks/00-dsc04879.jpg': {
    image: masksMaterials,
    alt: 'Conductive tape, wires, scissors, and mask-making materials on a workshop table',
  },
  'illuminated-heritage-masks/0-dsc05005.jpg': {
    image: masksCircuitHelp,
    alt: 'Casey Anderson helps a participant assemble a small circuit at the workshop table',
  },
  'illuminated-heritage-masks/dsc04865.jpg': {
    image: masksDemonstration,
    alt: 'Casey Anderson demonstrates a white mask while addressing the workshop',
  },
  'illuminated-heritage-masks/dsc04870.jpg': {
    image: masksDecorated,
    alt: 'A participant holds a colorful decorated mask with long feathers',
  },
  'illuminated-heritage-masks/dsc04920.jpg': {
    image: masksLed,
    alt: 'A participant tests a glowing purple LED held between their fingers',
  },
  'illuminated-heritage-masks/dsc04983.jpg': {
    image: masksTable,
    alt: 'A workshop collaborator assists two participants with their mask-making materials',
  },
  'illuminated-heritage-masks/dsc05118.jpg': {
    image: masksRoom,
    alt: 'Participants and facilitators work around tables inside Octavia Lab',
  },
  'illuminated-heritage-masks/dsc05263.jpg': {
    image: masksFinished,
    alt: 'A participant wears a cylindrical cardboard mask illuminated by a blue LED',
  },
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
  'sankofa-red-vision-reopening.jpg': {
    // EXIF orientation displays the unchanged original as a portrait image.
    image: { ...sankofaRed, width: 3000, height: 4000 },
    alt: 'Sankofa Red payphone with its red handset outside KAOS Network during the November 2026 Vision Theatre grand reopening celebration',
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
