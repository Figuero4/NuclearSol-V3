# Guía de fotos reales — INS

19 espacios de imagen en el sitio, listos para recibir fotos reales. El código ya está actualizado (etiquetas `<img>` en vez de ilustraciones SVG) — solo falta que coloques los archivos con el nombre exacto en la ruta exacta.

**Dónde buscar:** [Unsplash](https://unsplash.com), [Pexels](https://pexels.com) o [Pixabay](https://pixabay.com) — las tres son gratuitas para uso comercial, sin atribución obligatoria. Busca en inglés, da mejores resultados que en español para este tipo de fotografía industrial.

**Formato recomendado para todas:** `.jpg`, orientación horizontal (excepto donde se indique lo contrario), mínimo 1600px de ancho. Comprime antes de subir si el archivo pesa más de 500KB — [squoosh.app](https://squoosh.app) es gratis y rápido.

---

## Sección Solutions (7 fotos)

Carpeta: `assets/media/solutions/`

| Archivo | Buscar | Nota |
|---|---|---|
| `01-radiation-protection.jpg` | `nuclear radiation protection technician` / `radiation safety worker` | Técnico con dosímetro o equipo de protección |
| `02-staff-augmentation.jpg` | `engineering team meeting` / `industrial technicians team` | Equipo de trabajo, no oficina corporativa genérica |
| `03-surface-decontamination.jpg` | `industrial cleaning equipment` / `pressure washing industrial` | Descontaminación/limpieza de superficie |
| `04-waste-management.jpg` | `industrial waste containers` / `storage drums facility` | Contenedores/tambores industriales |
| `05-laboratory-instrumentation.jpg` | `laboratory technician instrument` / `radiation detector lab` | Instrumentación de laboratorio |
| `06-non-destructive-testing.jpg` | `industrial inspection equipment` / `ultrasonic testing` | Inspección de componentes |
| `07-mission-critical-construction.jpg` | `data center construction` / `server room construction` | Construcción de centro de datos |

## Sección Technology (7 fotos)

Carpeta: `assets/media/technology/`

| Archivo | Buscar | Nota |
|---|---|---|
| `01-alara-tools.jpg` | `radiation detection equipment` / `dosimeter tool` | Herramientas de reducción de exposición |
| `02-video-audio.jpg` | `industrial camera equipment` / `security monitoring equipment` | Equipo de video/audio industrial |
| `03-instrumentation-software.jpg` | `monitoring dashboard screen` / `control room monitor` | Software/pantalla de monitoreo |
| `04-remote-monitoring.jpg` | `remote sensor technology` / `industrial monitoring tower` | Monitoreo remoto |
| `05-ppe.jpg` | `personal protective equipment industrial` / `hazmat suit` | Equipo de protección personal |
| `06-decontamination-resins.jpg` | `industrial liquid processing` / `water treatment tanks` | Procesamiento de líquidos |
| `07-specialized-tools.jpg` | `industrial tools closeup` / `mechanical tools workshop` | Herramientas especializadas |

## Sección Industries (4 fotos)

Carpeta: `assets/media/industries/`

| Archivo | Buscar | Nota |
|---|---|---|
| `nuclear.jpg` | `nuclear power plant` / `cooling towers` | Planta nuclear, exterior |
| `government.jpg` | `government building` / `federal building exterior` | Edificio gubernamental serio, no genérico |
| `industrial.jpg` | `industrial facility` / `factory exterior` | Planta industrial privada |
| `mission-critical.jpg` | `data center exterior` / `server racks facility` | Centro de datos |

## Sección About (1 foto)

Carpeta: `assets/media/about/`

| Archivo | Buscar | Nota |
|---|---|---|
| `team.jpg` | `control room operators` / `engineers control room` | Sala de control o equipo técnico — es la foto que acompaña "Sobre INS", debe transmitir experiencia y seriedad |

---

## Cómo colocarlas

1. Dentro de `assets/media/` (donde ya están `hero.mp4` y `hero-poster.jpg`), crea tres subcarpetas: `solutions/`, `technology/`, `industries/`, `about/`.
2. Descarga cada foto con el nombre EXACTO de la tabla (minúsculas, guiones, `.jpg`).
3. Colócala en su carpeta correspondiente.
4. Guarda y recarga Live Server — cada imagen aparece sola en cuanto el archivo existe en la ruta correcta.

**Estructura final esperada:**
```
assets/media/
├── hero.mp4
├── hero-poster.jpg
├── solutions/
│   ├── 01-radiation-protection.jpg
│   ├── 02-staff-augmentation.jpg
│   ├── 03-surface-decontamination.jpg
│   ├── 04-waste-management.jpg
│   ├── 05-laboratory-instrumentation.jpg
│   ├── 06-non-destructive-testing.jpg
│   └── 07-mission-critical-construction.jpg
├── technology/
│   ├── 01-alara-tools.jpg
│   ├── 02-video-audio.jpg
│   ├── 03-instrumentation-software.jpg
│   ├── 04-remote-monitoring.jpg
│   ├── 05-ppe.jpg
│   ├── 06-decontamination-resins.jpg
│   └── 07-specialized-tools.jpg
├── industries/
│   ├── nuclear.jpg
│   ├── government.jpg
│   ├── industrial.jpg
│   └── mission-critical.jpg
└── about/
    └── team.jpg
```

## Si una foto tarda en llegar

No hay problema en ir subiendo las 19 poco a poco — cada `<img>` es independiente. Mientras no exista el archivo, el navegador muestra un ícono de imagen rota en ese espacio nada más; el resto del sitio sigue funcionando normal.
