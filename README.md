# EcoScan IA

Aplicacion movil para escanear residuos con camara e inteligencia artificial.

## Tecnologias usadas

- Expo y React Native para el desarrollo movil.
- TypeScript para definir tipos e interfaces del proyecto.
- Firebase Authentication para registro, inicio de sesion y cierre de sesion.
- Gemini API para analizar la imagen del residuo capturada con la camara.
- Google AI Studio para generar la API key de Gemini.
- Expo Camera para abrir la camara y tomar fotos.
- Expo FileSystem para convertir la foto a base64 antes de enviarla a Gemini.
- AsyncStorage para guardar el historial de escaneos de forma local.
- Supabase Storage para alojar la imagen de fondo reutilizada en la app.

## Variables de entorno

- El proyecto usa un archivo `.env` para guardar la clave de Gemini.
- La variable requerida es `EXPO_PUBLIC_GEMINI_API_KEY`.
- El archivo `.env` esta omitido por `.gitignore` para no subir la API key al repositorio.

## Funcionalidades principales

- Registro e inicio de sesion con Firebase.
- Pantalla principal con acceso a escaneo e historial.
- Captura de imagenes usando la camara del dispositivo.
- Analisis del residuo usando Gemini API.
- Resultado con categoria, reciclable/no reciclable, recomendacion e informacion adicional.
- Historial local de escaneos usando ReportContext y AsyncStorage.

## Nota importante

- El historial se guarda localmente en el dispositivo.
- No se guarda en Firebase, SQLite ni Supabase Database.
- La imagen del escaneo se guarda como `photoUri` local.
