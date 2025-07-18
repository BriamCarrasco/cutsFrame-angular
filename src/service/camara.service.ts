import { Injectable } from '@angular/core';

/**
 * Interfaz que representa la estructura de una cámara en CutsFrame.
 */
export interface Camera {
  id: string;
  marca: string;
  modelo: string;
  tipoCamara: string;
  fechaLanzamiento: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  tipoSensor: string;
  tamanoSensor: string;
  velocidadObturacion: string;
  resolucion: string;
  puntosEnfoque: string;
  velocidadRafaga: string;
  video: string;
  pantalla: string;
  formatoArchivo: string;
  flash: string;
  materialConstruccion: string;
  ISO: string;
  montura: string;
  tipoVisor: string;
  peso: string;
  infoCamara: string[];
  caracteristicas: string[];
  categoria: string;
  imagen: string;
  link: string;
}

/**
 * Servicio para la gestión de cámaras en CutsFrame.
 * 
 * Permite obtener, filtrar, agregar, actualizar y eliminar cámaras.
 * Gestiona la colección de cámaras emblemáticas y sus datos técnicos.
 */
@Injectable({ providedIn:'root'})
export class CameraService {

   /** Colección de cámaras disponibles en el sistema */
  private camaras: Camera[] = [
    {
        id: "Aaton7LTR",
        marca: "Aaton",
        modelo: "7 LTR",
        tipoCamara: "Cámara de cine",
        fechaLanzamiento: "1976",
        descripcionCorta: "La cámara de cine ligera que revolucionó el documental.",
        descripcionCompleta: "La Aaton 7 LTR marcó un antes y un después en el cine documental y de reportaje. Su diseño ergonómico y su bajo nivel de ruido permitieron a los cineastas trabajar con mayor libertad y movilidad, capturando la realidad de forma más natural y espontánea.",
        tipoSensor: "N/A",
        tamanoSensor: "16mm (película analógica)",
        velocidadObturacion: "N/A (manual mecánica)",
        resolucion: "N/A (película 16mm)",
        puntosEnfoque: "N/A",
        velocidadRafaga: "N/A",
        video: "No (película analógica)",
        pantalla: "N/A",
        formatoArchivo: "Película 16mm",
        flash: "No",
        materialConstruccion: "Metal y componentes plásticos",
        ISO: "N/A (depende de la película usada)",
        montura: "N/A",
        tipoVisor: "Visor óptico de hombro",
        peso: "Aproximadamente 3.2 kg",
        infoCamara: ["La Aaton 7 LTR, lanzada en la década de 1970, fue una cámara cinematográfica innovadora que marcó un antes y un después en el cine independiente. Su diseño ergonómico tipo “gato al hombro” ofrecía comodidad y estabilidad, facilitando el trabajo en terreno con una estética profesional",
        "Equipada con un motor silencioso, visor réflex y una mecánica robusta, la Aaton 7 LTR permitió una grabación fluida en 16 mm, ideal para documentales, cine de autor y producciones ágiles. Su sistema de carga rápida de película y su precisión en el arrastre fueron muy valorados por operadores de cámara.",
        "La Aaton 7 LTR no solo democratizó el acceso al cine de calidad, sino que también se convirtió en una herramienta creativa para cineastas de todo el mundo. Su legado permanece vigente, siendo considerada una de las cámaras más emblemáticas en la historia del cine documental y de guerrilla."
        ],
        caracteristicas: [
        "Formato: 16mm",
        "Diseño ergonómico: Inspirado en la forma de un gato sobre el hombro ('cat-on-the-shoulder').",
        "Funcionamiento silencioso: Ideal para grabación de sonido directo.",
        "Portabilidad: Muy ligera y compacta para rodajes en exteriores."
        ],
        categoria: "Cine",
        imagen: "/assets/Aaton7_LTR.jpg",
        link: "/pages/camaras/Aaton7r.html"
    },
    {
        id: "ArriflexBL4",
        marca: "Arriflex",
        modelo: "BL4",
        tipoCamara: "Cámara de cine",
        fechaLanzamiento: "1986",
        descripcionCorta: "La referencia en cámaras de cine silenciosas para rodajes profesionales.",
        descripcionCompleta: "La Arriflex BL4 fue una de las cámaras más populares en la industria cinematográfica durante los años 80 y 90, especialmente en largometrajes y comerciales. Su funcionamiento silencioso y su calidad de imagen la hicieron imprescindible en sets de grabación profesional.",
        tipoSensor: "N/A (película analógica)",
        tamanoSensor: "35mm (película analógica)",
        velocidadObturacion: "Variable, mecánica",
        resolucion: "N/A (película 35mm)",
        puntosEnfoque: "N/A",
        velocidadRafaga: "N/A",
        video: "No (película analógica)",
        pantalla: "N/A",
        formatoArchivo: "Película 35mm",
        flash: "No",
        materialConstruccion: "Metal resistente y componentes de alta calidad",
        ISO: "N/A (depende del film usado)",
        montura: "Arriflex estándar",
        tipoVisor: "Visor óptico réflex",
        peso: "Aproximadamente 6.5 kg",
        infoCamara:[
        "La Arriflex BL4, introducida a principios de la década de 1980, fue una cámara cinematográfica de 35 mm que consolidó el estándar de excelencia en la industria del cine profesional. Su sistema “BL” (blimped) garantizaba un funcionamiento silencioso, ideal para tomas con grabación directa de sonido.",
        "Con un diseño robusto y modular, visor réflex de alta calidad y compatibilidad con lentes PL mount, la Arriflex BL4 ofrecía gran versatilidad en rodajes de alto nivel. Su precisión mecánica, estabilidad en el transporte de película y confiabilidad la convirtieron en una favorita para estudios y cineastas exigentes.",
        "La BL4 no solo representó un hito tecnológico en su época, sino que también fue clave en la producción de numerosas películas y comerciales de alto perfil. A día de hoy, sigue siendo un ícono del cine analógico, símbolo de calidad, ingeniería alemana y tradición cinematográfica."
        ],
        caracteristicas: [
        "Formato: 35mm",
        "Sistema silencioso: Ideal para grabación de sonido directo en cine.",
        "Robustez y fiabilidad: Muy utilizada en producciones de alto nivel.",
        "Compatibilidad: Gran variedad de accesorios y ópticas profesionales."
        ],
        categoria: "Cine",
        imagen: "/assets/arriflex_bl4.jpg",
        link: "/pages/camaras/arriflex-bl4.html"
    },
    {
        id: "RedKomodo6K",
        marca: "RED",
        modelo: "Komodo 6K",
        tipoCamara: "Cámara de cine digital compacta",
        fechaLanzamiento: "2020",
        descripcionCorta: "La revolución digital compacta para cineastas independientes.",
        descripcionCompleta: "La RED Komodo 6K democratizó el acceso a la cinematografía digital de alta gama gracias a su tamaño reducido y su precio competitivo. Es ideal para producciones independientes, videoclips y proyectos que requieren movilidad sin sacrificar calidad de imagen.",
        tipoSensor: "Super 35",
        tamanoSensor: "Super 35",
        velocidadObturacion: "No especificado",
        resolucion: "6K",
        puntosEnfoque: "No especificado",
        velocidadRafaga: "No especificado",
        video: "RAW y ProRes en alta calidad",
        pantalla: "No especificado",
        formatoArchivo: "RAW, ProRes",
        flash: "No",
        materialConstruccion: "No especificado",
        ISO: "No especificado",
        montura: "Canon RF",
        tipoVisor: "No especificado",
        peso: "No especificado",
        infoCamara: [
        "La RED Komodo 6K, lanzada en la década de 2020, es una cámara cinematográfica digital compacta que revolucionó la producción independiente y profesional gracias a su tamaño reducido, calidad de imagen cinematográfica y accesibilidad dentro del ecosistema RED.",
        "Equipada con un sensor Super 35 de 6K y montura RF, la Komodo ofrece grabación en RAW comprimido (REDCODE) con un rango dinámico impresionante de más de 16 stops. Su diseño cúbico, liviano y robusto permite montarla en drones, gimbals o configuraciones de mano, brindando gran flexibilidad en producciones ágiles.",
        "La RED Komodo 6K ha sido adoptada por cineastas, documentalistas y creadores de contenido por igual, al ofrecer prestaciones profesionales en un formato portátil. Representa la nueva generación del cine digital, combinando innovación tecnológica, rendimiento de alto nivel y portabilidad extrema."
        ],
        caracteristicas: [
        "Resolución: 6K Super 35",
        "Tamaño compacto: Fácil de montar en drones, gimbals y rigs ligeros.",
        "RAW y ProRes: Grabación profesional en formatos de alta calidad.",
        "Montura Canon RF: Versatilidad con ópticas modernas y vintage."
        ],
        categoria: "Cine",
        imagen: "/assets/komodo_6k.jpg",
        link: "/pages/camaras/red-komodo-6k.html"
    },
    {
        id: "LeicaM3",
        marca: "Leica",
        modelo: "M3",
        tipoCamara: "Cámara de telémetro de 35mm",
        fechaLanzamiento: "1954",
        descripcionCorta: "La cámara que definió el reportaje fotográfico moderno.",
        descripcionCompleta: "Considerada una de las cámaras más influyentes y mejor construidas de todos los tiempos, la Leica M3 estableció el estándar para las cámaras de 35mm. Su precisión mecánica y óptica legendaria la convirtieron en la favorita de fotoperiodistas y artistas por igual. Su impacto en la fotografía de reportaje fue inmenso.",
        tipoSensor: "Película de 35mm",
        tamanoSensor: "35mm (película analógica)",
        velocidadObturacion: "1s a 1/1000s + Bulb",
        resolucion: "N/A (película 35mm)",
        puntosEnfoque: "N/A",
        velocidadRafaga: "N/A",
        video: "No",
        pantalla: "No",
        formatoArchivo: "Película 35mm",
        flash: "Compatible mediante zapata accesoria",
        materialConstruccion: "Cuerpo metálico de alta precisión",
        ISO: "Depende de la película utilizada",
        montura: "Leica M",
        tipoVisor: "Telémetro con líneas de encuadre para 50mm, 90mm y 135mm",
        peso: "Aproximadamente 580 g (solo cuerpo)",
        infoCamara:["La Leica M3, lanzada en 1954, es una de las cámaras más icónicas de la historia de la fotografía. Fue la primera cámara de la serie M de Leica, reemplazando a la serie de tornillo (como la Leica IIIf) y marcando un hito en el diseño con su innovador visor combinado y sistema de enfoque telemétrico.",
        "En su época, la M3 se destacaba por su construcción robusta, precisión mecánica y facilidad de uso, convirtiéndose en la cámara preferida por fotoperiodistas y artistas como Henri Cartier-Bresson. Su competencia directa incluía cámaras como la Nikon S2 y la Canon P, aunque ninguna igualó la calidad óptica y mecánica de la Leica en ese momento.",
        "La M3 no solo definió un estándar en cámaras telemétricas, sino que también consolidó la reputación de Leica como referente de calidad. Su legado perdura hoy, siendo aún utilizada por fotógrafos apasionados por el film y el diseño clásico."
        ],
        caracteristicas: [
        "Tipo: Cámara de telémetro de 35mm",
        "Lentes: Intercambiables, montura Leica M",
        "Obturador: Plano focal de tela, velocidades de 1s a 1/1000s + B",
        "Visor: Amplio y brillante, con líneas de encuadre automáticas para 50, 90, 135mm."
        ],
        categoria: "Clasica",
        imagen: "/assets/leica-m3.jpg",
        link: "/pages/camaras/leicam3.html"
    },
    {
        id: "KodakBrownie",
        marca: "Kodak",
        modelo: "Brownie",
        tipoCamara: "Cámara de caja",
        fechaLanzamiento: "1900",
        descripcionCorta: "La cámara que popularizó la fotografía para las masas.",
        descripcionCompleta: "Lanzada por Eastman Kodak, la Kodak Brownie fue una cámara de bajo costo y extremadamente fácil de usar, que puso la fotografía al alcance de millones de personas, incluyendo niños. Su simplicidad y accesibilidad la convirtieron en un fenómeno cultural, dando origen al concepto de \"instantáneas\" y fomentando el auge del álbum de fotos familiar.",
        tipoSensor: "Película en rollo (117)",
        tamanoSensor: "Tamaño variable según modelo, aproximadamente 6×6 cm",
        velocidadObturacion: "Fija (~1/50s aprox.)",
        resolucion: "N/A (película analógica)",
        puntosEnfoque: "Enfoque fijo",
        velocidadRafaga: "No",
        video: "No",
        pantalla: "No",
        formatoArchivo: "Película en rollo 117",
        flash: "No integrado",
        materialConstruccion: "Cartón con acabado en cuero sintético (modelos iniciales)",
        ISO: "Depende de la película utilizada",
        montura: "No intercambiable",
        tipoVisor: "Visores ópticos simples (tipo periscopio)",
        peso: "Aproximadamente 450 g",
        infoCamara:["La Kodak Brownie fue lanzada en 1900 por Eastman Kodak Company y revolucionó la fotografía al hacerla accesible para el público general. Fue una de las primeras cámaras de bajo costo, compacta y fácil de usar, diseñada especialmente para aficionados.",
        "Con su estructura de cartón y lente sencilla, la Brownie popularizó el concepto de la fotografía instantánea: 'Usted aprieta el botón, nosotros hacemos el resto'. Permitió que millones de personas documentaran su vida cotidiana por primera vez, dando origen al concepto de la fotografía popular.",
        "En su época, no tenía una competencia directa en términos de simplicidad y precio. La Brownie marcó el inicio de la fotografía amateur y familiar, y su legado perdura como símbolo de democratización tecnológica en el ámbito fotográfico."
        ],
        caracteristicas: [
        "Tipo: Cámara de caja simple",
        "Película: Rollo 117",
        "Lente: Menisco simple, enfoque fijo",
        "Precio de lanzamiento: $1 (en 1900), equivalente a unos $30-40 actuales."
        ],
        categoria: "Clasica",
        imagen: "/assets/kodak_brownie.png",
        link: "/pages/camaras/kodak_brownie.html"
    },
    {
        id: "NikonF",
        marca: "Nikon",
        modelo: "F",
        tipoCamara: "SLR (Single-Lens Reflex) de 35mm",
        fechaLanzamiento: "1959",
        descripcionCorta: "El caballo de batalla de los fotoperiodistas profesionales.",
        descripcionCompleta: "La Nikon F fue la primera SLR de Nikon y se convirtió rápidamente en la cámara estándar para fotoperiodistas en todo el mundo. Su robustez legendaria, fiabilidad inquebrantable y el amplio ecosistema de lentes y accesorios la hicieron indispensable en eventos históricos, zonas de conflicto y misiones espaciales (como la Apolo). Consolidó la reputación de Nikon como un líder en la industria.",
        tipoSensor: "Película de 35mm",
        tamanoSensor: "24×36 mm (formato completo de 35mm)",
        velocidadObturacion: "1s a 1/1000s + Bulb",
        resolucion: "N/A (película analógica)",
        puntosEnfoque: "Manual, a través del visor",
        velocidadRafaga: "Disponible con motor de arrastre externo (hasta 4 fps)",
        video: "No",
        pantalla: "No",
        formatoArchivo: "Película de 35mm",
        flash: "Zapata para flash externo (sin TTL)",
        materialConstruccion: "Aleación metálica (muy robusta)",
        ISO: "Depende de la película utilizada",
        montura: "Nikon F (la primera versión de esta montura)",
        tipoVisor: "Visor réflex intercambiable con pentaprisma",
        peso: "Aproximadamente 685 g (solo el cuerpo)",
        infoCamara:[
        "La Nikon F, lanzada en 1959, fue una cámara revolucionaria que marcó el inicio del dominio de Nikon en la fotografía profesional. Fue la primera réflex de 35mm de la marca y estableció el estándar para las cámaras SLR modernas gracias a su sistema modular y diseño robusto.",
        "Con visor intercambiable, fotómetro acoplable y una amplia gama de accesorios, la Nikon F ofrecía una flexibilidad sin precedentes. Su confiabilidad y precisión la convirtieron en la cámara preferida por fotoperiodistas y agencias como la NASA, que la usaron incluso en misiones espaciales.",
        "La Nikon F no solo consolidó la reputación de Nikon a nivel mundial, sino que también transformó la industria, desplazando a las cámaras telemétricas como opción principal para los profesionales. Su legado perdura, siendo aún apreciada por coleccionistas y fotógrafos de film."
        ],
        caracteristicas: [
        "Tipo: SLR (Single-Lens Reflex) de 35mm",
        "Lentes: Intercambiables, montura Nikon F (la primera)",
        "Construcción: Robusta, completamente metálica y modular.",
        "Sistema: Primer sistema SLR verdaderamente profesional y completo del mundo."
        ],
        categoria: "Clasica",
        imagen: "/assets/nikon_f3.jpg",
        link: "/pages/camaras/nikon_f.html"
    },
    {
        id: "NikonD1",
        marca: "Nikon",
        modelo: "D1",
        tipoCamara: "DSLR profesional",
        fechaLanzamiento: "1999",
        descripcionCorta: "La primera DSLR profesional asequible que revolucionó el fotoperiodismo.",
        descripcionCompleta: "Lanzada por Nikon, la Nikon D1 fue la primera DSLR profesional desarrollada completamente por un fabricante de cámaras, marcando el inicio de la era digital en el fotoperiodismo. Su velocidad, robustez y precio relativamente accesible la convirtieron en la herramienta preferida de los profesionales a finales de los 90 y principios de los 2000.",
        tipoSensor: "CCD",
        tamanoSensor: "APS-C",
        velocidadObturacion: "30s a 1/16,000s",
        resolucion: "2.7 MP",
        puntosEnfoque: "5",
        velocidadRafaga: "4.5 fps",
        video: "No",
        pantalla: "LCD de 2 pulgadas",
        formatoArchivo: "JPEG, TIFF",
        flash: "Sí, integrado",
        materialConstruccion: "Aleación de magnesio",
        ISO: "200-1600",
        montura: "Nikon F",
        tipoVisor: "Óptico pentaprisma",
        peso: "1.2 kg (aprox)",
        infoCamara:[
        "La Nikon D1, lanzada a finales de la década de 1990, fue una cámara revolucionaria que marcó el inicio de la era digital profesional en la fotografía. Diseñada íntegramente por Nikon, esta DSLR representó una transición histórica desde la película al sensor digital.",
        "Con un sensor CCD de 2.7 megapíxeles, velocidad de disparo continuo de 4.5 fps y cuerpo robusto basado en las cámaras réflex de la marca, la Nikon D1 ofrecía rendimiento y fiabilidad para fotoperiodistas y profesionales exigentes. Su integración con flujos de trabajo digitales permitió una agilidad inédita en la entrega de imágenes.",
        "La Nikon D1 no solo sentó las bases de las cámaras réflex digitales modernas, sino que también democratizó el acceso a la fotografía digital profesional. Su impacto fue decisivo en el fotoperiodismo y en la evolución de la industria, consolidándose como un ícono pionero en la transición hacia lo digital."
        ],
        caracteristicas: [
        "Sensor: CCD de 2.7 MP APS-C",
        "ISO: 200-1600",
        "Velocidad de disparo: 4.5 fps",
        "Montura: Nikon F"
        ],
        categoria: "Digital",
        imagen: "/assets/nikon_d1.jpg",
        link: "/pages/camaras/nikon-d1.html"
    },
    {
        id: "CanonEOS5D",
        marca: "Canon",
        modelo: "EOS 5D",
        tipoCamara: "DSLR full frame",
        fechaLanzamiento: "2005",
        descripcionCorta: "La primera full frame asequible, favorita de fotógrafos y videógrafos.",
        descripcionCompleta: "La Canon EOS 5D democratizó el acceso al formato full frame, ofreciendo calidad profesional a un precio mucho más accesible. Su sucesora, la 5D Mark II, revolucionó la industria del video con su capacidad de grabar en Full HD, siendo utilizada incluso en producciones cinematográficas.",
        tipoSensor: "CMOS",
        tamanoSensor: "Full Frame (36×24 mm)",
        velocidadObturacion: "30s a 1/8000s",
        resolucion: "12.8 MP",
        puntosEnfoque: "9 + 6 asistidos",
        velocidadRafaga: "3 fps",
        video: "No (la Mark II sí tiene video Full HD)",
        pantalla: "LCD de 2.5 pulgadas",
        formatoArchivo: "JPEG, RAW",
        flash: "No integrado",
        materialConstruccion: "Aleación de magnesio",
        ISO: "100-1600 (ampliable a 50-3200)",
        montura: "Canon EF",
        tipoVisor: "Óptico pentaprisma",
        peso: "895 g (solo cuerpo)",
        infoCamara:[
        "La Canon EOS 5D, presentada en 2005, marcó un hito en la fotografía digital al ser la primera cámara réflex digital de formato completo (full frame) con un cuerpo relativamente compacto y accesible para fotógrafos profesionales y avanzados.",
        "Equipada con un sensor CMOS de 35 mm y 12.8 megapíxeles, la 5D ofrecía una calidad de imagen excepcional, profundidad de campo auténtica y excelente rendimiento con poca luz. Su compatibilidad con la amplia gama de lentes EF y su construcción robusta la convirtieron en una herramienta versátil tanto para estudio como para trabajo en terreno.",
        "La Canon EOS 5D redefinió los estándares de la fotografía profesional, allanando el camino para generaciones futuras de cámaras full frame. Su legado perdura como una de las cámaras más influyentes de su época, apreciada por fotógrafos de retrato, paisaje y eventos alrededor del mundo."
        ],
        caracteristicas: [
        "Sensor: CMOS full frame de 12.8 MP",
        "ISO: 100-1600 (ampliable)",
        "Video: La Mark II fue pionera en grabación de video Full HD",
        "Montura: Canon EF"
        ],
        categoria: "Digital",
        imagen: "/assets/canon_5d.jpg",
        link: "/pages/camaras/canon-5d.html"
    },
    {
        id: "NikonD90",
        marca: "Nikon",
        modelo: "D90",
        tipoCamara: "DSLR semiprofesional",
        fechaLanzamiento: "2008",
        descripcionCorta: "La primera DSLR en grabar video HD, puente entre foto y cine digital.",
        descripcionCompleta: "La Nikon D90 fue la primera cámara réflex digital en ofrecer grabación de video HD, abriendo la puerta a la creación audiovisual con cámaras fotográficas. Su calidad de imagen y versatilidad la hicieron muy popular entre fotógrafos y videógrafos aficionados y profesionales.",
        tipoSensor: "CMOS",
        tamanoSensor: "APS-C (23.6×15.8 mm)",
        velocidadObturacion: "30s a 1/4000s",
        resolucion: "12.3 MP",
        puntosEnfoque: "11",
        velocidadRafaga: "4.5 fps",
        video: "HD 720p a 24 fps",
        pantalla: "LCD de 3 pulgadas",
        formatoArchivo: "JPEG, RAW, AVI (video)",
        flash: "Sí, integrado",
        materialConstruccion: "Plástico reforzado con chasis metálico interno",
        ISO: "200-3200 (ampliable a 100-6400)",
        montura: "Nikon F",
        tipoVisor: "Óptico pentaprisma",
        peso: "620 g (aprox)",
        infoCamara:[
        "La Nikon D90, presentada en 2008, fue una cámara innovadora que marcó un hito al ser la primera DSLR del mundo en incorporar grabación de video en alta definición. Esta funcionalidad revolucionaria la convirtió en una opción popular entre fotógrafos y videógrafos emergentes.",
        "Equipada con un sensor CMOS de 12.3 megapíxeles, un sistema de enfoque rápido y preciso, y una excelente calidad de imagen, la Nikon D90 ofrecía un equilibrio ideal entre rendimiento, portabilidad y precio. Su cuerpo ergonómico y su interfaz intuitiva la hacían atractiva tanto para aficionados avanzados como para profesionales.",
        "La Nikon D90 no solo elevó el estándar de las cámaras de gama media, sino que también ayudó a democratizar la producción audiovisual, al permitir a los usuarios capturar fotos y videos de alta calidad con un solo dispositivo. Su legado perdura como uno de los modelos más influyentes de su época."
        ],
        caracteristicas: [
        "Sensor: CMOS APS-C de 12.3 MP",
        "ISO: 200-3200 (ampliable)",
        "Video: Primera DSLR con grabación de video HD (720p)",
        "Pantalla: LCD de 3\""
        ],
        categoria: "Digital",
        imagen: "/assets/nikon_d90.jpg",
        link: "/pages/camaras/nikon-d90.html"
    },
    {
        id: "FujifilmXHalf",
        marca: "Fujifilm",
        modelo: "X-Half",
        tipoCamara: "Digital compacta con inspiración analógica",
        fechaLanzamiento: "2025",
        descripcionCorta: "La cámara digital que recrea la esencia de las \"half-frame\" analógicas.",
        descripcionCompleta: "La Fujifilm X-Half es una propuesta audaz que fusiona la nostalgia de las cámaras analógicas de medio formato con la conveniencia de lo digital. Su diseño minimalista y compacto, junto con funciones que emulan la experiencia de disparar con película (como la palanca de avance y el modo \"Cámara de Película\"), la convierten en una cámara única en el mercado actual. Está pensada para una forma de fotografiar más consciente y divertida, priorizando la experiencia y la composición vertical para compartir fácilmente en redes sociales.",
        tipoSensor: "No especificado (probablemente APS-C o menor)",
        tamanoSensor: "Orientado verticalmente",
        velocidadObturacion: "No especificada",
        resolucion: "No especificada",
        puntosEnfoque: "No especificado",
        velocidadRafaga: "No especificada",
        video: "No especificado",
        pantalla: "Sí (no especificada)",
        formatoArchivo: "Digital con revelado simulado",
        flash: "No especificado",
        materialConstruccion: "Compacto y liviano",
        ISO: "No especificado",
        montura: "Fija o tipo X (no confirmado)",
        tipoVisor: "No especificado",
        peso: "Muy ligera",
        infoCamara:[
        "La Fujifilm X-Half, lanzada en 2025, representa una innovadora cámara digital compacta que combina un diseño retro con tecnología moderna, pensada especialmente para creadores de contenido y fotógrafos que buscan estilo y funcionalidad en un formato portátil.",
        "Su sensor CMOS de 1 pulgada y lente fija FUJINON de 10.8 mm f/2.8 permiten capturar imágenes de alta calidad en un formato vertical 3:4, ideal para redes sociales y fotografía creativa. La X-Half destaca por su cuerpo ligero y compacto, junto con un visor óptico vertical y una pantalla táctil trasera optimizada para composición en formato vertical.",
        "En un mercado dominado por cámaras tradicionales, la Fujifilm X-Half ofrece una experiencia fotográfica única que combina estética vintage, portabilidad y herramientas creativas, convirtiéndola en un símbolo de innovación y estilo para la fotografía contemporánea."
        ],
        caracteristicas: [
        "Inspiración \"Half-Frame\": Diseñada para la composición vertical con un sensor orientado verticalmente.",
        "Palanca de avance de \"fotograma\": Una característica analógica que simula el avance de rollo.",
        "Modo \"Cámara de Película\": Permite simular carretes de 36, 54 o 72 \"exposiciones\" con revelado digital posterior.",
        "Diseño ultra-compacto: Muy ligera y pensada para llevar a diario y disparar de forma espontánea."
        ],
        categoria: "Unicas",
        imagen: "/assets/fujifilm_xhalf.jpg",
        link: "/pages/camaras/fuji_xhalf.html"
    },
    {
        id: "LytroLightfield",
        marca: "Lytro",
        modelo: "Lightfield Camera",
        tipoCamara: "Cámara de campo de luz",
        fechaLanzamiento: "2012",
        descripcionCorta: "La cámara que permite enfocar las fotos *después* de tomarlas.",
        descripcionCompleta: "La Lytro Lightfield Camera fue una pionera en la tecnología de campo de luz, que permitía a los usuarios re-enfocar las imágenes después de haberlas tomado. Su diseño era igualmente futurista: un cuerpo prismático y minimalista que no se parecía a ninguna cámara convencional, con una interfaz muy simple. Aunque no fue un éxito comercial masivo, marcó un hito en la exploración tecnológica para la fotografía digital.",
        tipoSensor: "Sensor de campo de luz (plenóptico)",
        tamanoSensor: "Microlentes múltiples sobre sensor",
        velocidadObturacion: "No especificada",
        resolucion: "Aproximadamente 1.2 MP efectivos (con reenfoque)",
        puntosEnfoque: "Reenfoque posterior digital",
        velocidadRafaga: "No especificada",
        video: "No (modelos posteriores sí)",
        pantalla: "Táctil (1.5” aprox.)",
        formatoArchivo: "LFP (formato propietario de Lytro)",
        flash: "No",
        materialConstruccion: "Plástico de alta densidad",
        ISO: "No especificado",
        montura: "Fija",
        tipoVisor: "No posee visor óptico",
        peso: "224 g",
        infoCamara:[
        "La Lytro Lightfield, lanzada en 2012, revolucionó la fotografía digital al introducir la tecnología de fotografía de campo de luz, permitiendo capturar no solo la intensidad, sino también la dirección de la luz, lo que abre nuevas posibilidades creativas en el enfoque y la composición después de tomada la foto.",
        "Su innovador sensor de campo de luz y diseño compacto permitían a los usuarios ajustar el enfoque, la profundidad de campo y la perspectiva tras la captura, cambiando por completo la experiencia tradicional de la fotografía digital. La cámara estaba pensada para entusiastas y profesionales interesados en explorar nuevas fronteras creativas.",
        "Aunque la Lytro Lightfield no tuvo competencia directa en su momento debido a su tecnología única, su legado perdura como pionera en el campo de la fotografía computacional, inspirando desarrollos futuros en cámaras y dispositivos con capacidades avanzadas de captura y edición de imagen."
        ],
        caracteristicas: [
        "Captura de campo de luz: Graba dirección y color de los rayos de luz.",
        "Diseño prismático: Formato largo y estrecho, sin controles obvios.",
        "Re-enfoque post-captura: La característica principal de su tecnología."
        ],
        categoria: "Unicas",
        imagen: "/assets/lytro.jpg",
        link: "/pages/camaras/lytro.html"
    },
    {
        id: "PolaroidSX70",
        marca: "Polaroid",
        modelo: "SX-70",
        tipoCamara: "Instantánea SLR plegable",
        fechaLanzamiento: "1972",
        descripcionCorta: "La cámara instantánea plegable que hizo de la fotografía un acto mágico.",
        descripcionCompleta: "La Polaroid SX-70 fue una revolución en el mundo de la fotografía instantánea. No solo ofrecía imágenes al instante, sino que lo hacía en un diseño elegante, compacto y completamente plegable. Fue la primera cámara SLR instantánea y uno de los productos más icónicos de la historia del diseño industrial, admirada tanto por fotógrafos como por diseñadores. Su impacto cultural fue enorme, popularizando la fotografía como un medio espontáneo y creativo.",
        tipoSensor: "No aplica (película instantánea)",
        tamanoSensor: "No aplica",
        velocidadObturacion: "Variable automática (aprox. 1/175s - >10s)",
        resolucion: "No aplica (película)",
        puntosEnfoque: "Manual",
        velocidadRafaga: "No",
        video: "No",
        pantalla: "No",
        formatoArchivo: "Película SX-70",
        flash: "Opcional (Flashbar, luego electrónicos)",
        materialConstruccion: "Metal y cuero",
        ISO: "Película SX-70 (~ISO 150)",
        montura: "Fija con lente plegable",
        tipoVisor: "Óptico réflex (SLR)",
        peso: "623 g",
        infoCamara:[
        "La Polaroid SX-70, lanzada en 1972, fue una cámara instantánea revolucionaria que redefinió la fotografía al integrar un diseño plegable elegante con la capacidad de revelar fotos automáticamente en segundos. Fue la primera cámara SLR instantánea del mundo.",
        "Con su innovador sistema de autofoco por sonar (en modelos posteriores), lente de vidrio de alta calidad y película integral auto-revelable, la SX-70 ofrecía una experiencia fotográfica única, instantánea y creativa. Su diseño compacto y futurista fue elogiado tanto por ingenieros como por diseñadores industriales.",
        "La SX-70 no solo convirtió la fotografía instantánea en un arte accesible, sino que también inspiró a generaciones de artistas y fotógrafos, incluyendo a Andy Warhol. Su impacto cultural y estético continúa vigente, siendo una de las cámaras más icónicas del siglo XX."
        ],
        caracteristicas: [
        "Tipo: Cámara instantánea SLR plegable",
        "Formato: Película instantánea integral SX-70",
        "Enfoque: Manual con visor réflex (SLR)",
        "Diseño: Cuerpo plegable con acabado en cuero y metal"
        ],
        categoria: "Unicas",
        imagen: "/assets/Polaroid_SX-70.jpg",
        link: "/pages/camaras/polaroidsx-70.html"
    }
  ];

  /**
   * Obtiene la lista completa de cámaras.
   * @returns Un array con todas las cámaras.
   */
  getCameras(): Camera[] {
    return this.camaras;
  }
  
  /**
   * Obtiene una cámara por su identificador único.
   * @param id Identificador de la cámara.
   * @returns La cámara encontrada o undefined si no existe.
   */
  getCamera(id: string): Camera | undefined {
    return this.camaras.find(cam => cam.id === id);
  }
  
  /**
   * Obtiene la lista de cámaras filtradas por categoría.
   * La comparación es insensible a mayúsculas/minúsculas y normaliza el plural.
   * @param category Nombre de la categoría.
   * @returns Un array de cámaras que pertenecen a la categoría indicada.
   */
  getCamerasByCategory(category: string): Camera[] {
    const normalizada = category.toLowerCase().replace(/s$/, '');
    return this.camaras.filter(cam => 
      cam.categoria.toLowerCase().replace(/s$/, '') === normalizada
    );
  }

  /**
   * Agrega una nueva cámara a la colección.
   * Asigna un identificador único basado en la fecha actual.
   * @param camara Objeto cámara a agregar.
   */
  agregarCamara(camara: Camera) {
    camara.id = Date.now().toString();
    this.camaras.push(camara);
  }

  /**
   * Actualiza los datos de una cámara existente.
   * @param camara Objeto cámara con los datos actualizados.
   */
  actualizarCamara(camara: Camera) {
    const idx = this.camaras.findIndex(c => c.id === camara.id);
    if (idx > -1) this.camaras[idx] = camara;
  }

  /**
   * Elimina una cámara de la colección por su identificador.
   * @param id Identificador de la cámara a eliminar.
   */
  eliminarCamara(id: string) {
    this.camaras = this.camaras.filter(c => c.id !== id);
  }
}

