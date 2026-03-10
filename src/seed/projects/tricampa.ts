import { buildRichText, h2, h3, p, ul } from '../lexical';
import type { ProjectSeedData } from '../types';

export const tricampa: ProjectSeedData = {
  title: 'Tricampa Smart Parking Platform',
  slug: 'tricampa-smart-parking',
  client: 'Tricampa',
  description:
    'Architected and developed a parking platform using Ruby on Rails and Vue.js with geolocation-based car finding and QR code ticketing, plus a companion Android app with BLE printing.',
  industries: ['Smart Cities & Mobility'],
  technologies: ['Ruby on Rails', 'Vue.js', 'Android', 'BLE', 'QR Codes'],
  status: 'draft',
  publishedDate: '2016-07-01T00:00:00.000Z',
  order: 13,
  featuredImageUrl: null,
  featuredImageAlt: 'Tricampa smart parking platform',
  content: buildRichText([
    h2('Overview'),
    p(
      'Tricampa is a smart parking solution that uses geolocation and QR codes to help drivers find their cars in parking lots and manage ticketing digitally.',
    ),

    h2('Key Contributions'),

    h3('Web Platform'),
    p(
      'Architected and developed the parking platform using Ruby on Rails and Vue.js, leveraging geolocation information to locate cars in parking lots and implementing QR codes for the ticketing system.',
    ),

    h3('Android Mobile App'),
    ul([
      'Developed a native Android application integrated with the platform',
      'Shared geolocation data for saving car locations within parking structures',
      'Printed QR codes using BLE devices for contactless ticketing',
      'Scanned QR codes for identification and ticketing purposes',
    ]),
  ]),
  translations: {
    es: {
      title: 'Plataforma de Estacionamiento Inteligente Tricampa',
      description:
        'Solución de estacionamiento inteligente que usa geolocalización y códigos QR para ayudar a los conductores a encontrar sus coches en estacionamientos y gestionar el ticketing digitalmente.',
      content: buildRichText([
        h2('Descripción General'),
        p('Tricampa es una solución de estacionamiento inteligente que usa geolocalización y códigos QR para ayudar a los conductores a encontrar sus coches en estacionamientos y gestionar el ticketing digitalmente.'),
        h2('Contribuciones Clave'),
        h3('Plataforma Web'),
        p('Arquitectura y desarrollo de la plataforma de estacionamiento usando Ruby on Rails y Vue.js, aprovechando información de geolocalización para localizar coches en estacionamientos e implementando códigos QR para el sistema de ticketing.'),
        h3('App Móvil Android'),
        ul([
          'Desarrollo de una aplicación nativa Android integrada con la plataforma',
          'Compartición de datos de geolocalización para guardar ubicaciones de coches dentro de estructuras de estacionamiento',
          'Impresión de códigos QR usando dispositivos BLE para ticketing sin contacto',
          'Escaneo de códigos QR para identificación y propósitos de ticketing',
        ]),
      ]),
    },
  },
};
