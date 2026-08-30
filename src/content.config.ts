import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


const panaderia = defineCollection({
  loader: glob({ base: './src/content/panaderia', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
       
      // SEO (nivel raíz)
      tituloSeo: z.string(),
      description: z.string(),
      slug: z.string(),

      // Todo lo del Hero, anidado
      hero: z.object({
        // ===== SECCIÓN MIGAS DE PAN =====
      migasPan: z.object({
        textoFinal: z.string(), // Texto final (ej: "Pan de Espuma" o "Preguntas Frecuentes")
        categoria: z.object({
          nombreCategoria: z.string(), // ej: "Panadería"
          slugCategoria: z.string()    // ej: "/panes-artesanales/"
        }).optional() // Es opcional: si no se envía, quedan 2 niveles (Inicio / Texto)
      }),
        subtituloProducto: z.string(),
        titulo: z.string(),
        descripcionProducto: z.string(),
        priceBand: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          }),
        ),
        whatsapp: z.string(),
        whatsappText: z.string(),
        secondaryHref: z.string().default('#ubicacion'),
        secondaryText: z.string().default('Ver ubicación'),
        frase: z.string(),
        imagenProducto: image(),
        imagenAlt: z.string(),
      }),

      precio: z
      .object({
        tituloPrecios: z.string(),
        tarjetas: z.array(
          z.object({
            monto: z.string(),
            unidad: z.string(),
            titulo: z.string(),
            descripcion: z.string(),
            textoBoton: z.string(),
            hrefBoton: z.string().default("#"),
          })
        ),
      })
      .optional(),

      ubicacion: z.object({
        tituloUbicacion: z.string(),
        textoProducto: z.string(),
        despedidaProducto: z.string(),
        ctaProducto: z.string(),
       }),
      historia: z.object({
        tituloHistoria: z.string(),
        parrafo1: z.string(),
        parrafo2: z.string(),
        parrafo3: z.string(),
        historiaPersonaje1: z.string(),
        historiaPersonaje2: z.string(),
       }).optional(),
      // Cómo pedir (nivel raíz, hermano de hero)
      comoPedir: z.object({
        subtituloPedir: z.string(),
        tituloPedir: z.string(),
        tarjetas: z.array(
          z.object({
            num: z.string(),
            titulo: z.string(),
            texto: z.string(),
          })
        ),
    
      }),

      // FAQ (nivel raíz, hermano de hero)
      tituloFaq: z.string().optional(),
      faq: z.array(
        z.object({
          pregunta: z.string(),
          respuesta: z.string(),
        })
      ).optional(),

      // CTA final (nivel raíz, hermano de hero)
      ctafinal: z.object({
        tituloFinal: z.string(),
        textoFinal: z.string(),
      }),
    }),
});

const pasteleria = defineCollection({
  loader: glob({ base: './src/content/pasteleria', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({

       // ===== SECCIÓN MIGAS DE PAN =====
      migasPan: z.object({
        textoFinal: z.string(), // Texto final (ej: "Pan de Espuma" o "Preguntas Frecuentes")
        categoria: z.object({
          nombreCategoria: z.string(), // ej: "Panadería"
          slugCategoria: z.string()    // ej: "/panes-artesanales/"
        }).optional() // Es opcional: si no se envía, quedan 2 niveles (Inicio / Texto)
      }),

      tituloSeo: z.string(),
      description: z.string(),
      subtituloProducto: z.string(),
      titulo1: z.string(),
      titulo2: z.string(),
      descripcionProducto: z.string(),
      imagenProducto: image(),
      nombreProducto: z.string(),
      altProducto:z.string(),
      slug: z.string(),

      // Lista dinámica de SVGs y textos por producto
      iconos: z.array(
        z.object({
          frase: z.string(),
          // Acepta un solo 'path' o una lista de 'paths'
          icono_frase: z.union([z.string(), z.array(z.string())]),
          viewBox: z.string().default("0 0 24 24"),
        })
      ).optional(),
      categoriasProductos: z.array(
        z.object({
          id: z.string(),               // "dulces" | "salados" (para el id de sección)
          fondo: z.enum(["claro", "oscuro"]).default("claro"), // bg-card sí/no
          eyebrow: z.string(),
          titulo: z.string(),
          descripcion: z.string(),
          productos: z.array(
            z.object({
              nombre: z.string(),
              descripcion: z.string(),
              imagen: image(),
              alt: z.string(),
              icono: z.object({
                icono_frase: z.union([z.string(), z.array(z.string())]),
                viewBox: z.string().default("0 0 24 24"),
              }),
            })
          ),
        })
      ).optional(),
      subtituloPasos: z.string().optional(),
      tituloPasos: z.string().optional(),
      descripcionPasos: z.string().optional(),
      pasos: z.array(
        z.object({
          titulo: z.string(),
          texto: z.string(),
          acento: z.boolean().optional(), // marca el paso final (con botón)
        })
      ).optional(),
      tituloFaq: z.string().optional(),
      faq: z.array(
        z.object({
          pregunta: z.string(),
          respuesta: z.string(),
        })
      ).optional(),
      ctafinal: z.object({
        tituloFinal: z.string(),
        textoFinal: z.string(),
      }),
    }),
});
export const collections = { panaderia, pasteleria };