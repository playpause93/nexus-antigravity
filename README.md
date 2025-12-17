# NEXUS - Real-Time Cryptocurrency Trading Statistics

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

Plataforma profesional de seguimiento de criptomonedas en tiempo real con datos de CoinGecko API.

## 🚀 Características

- ✅ Datos en tiempo real de CoinGecko API  
- ✅ Auto-actualización cada 60 segundos  
- ✅ Gráficos de 7 días (sparklines)  
- ✅ Búsqueda y filtros avanzados  
- ✅ 4 temas de color con persistencia  
- ✅ Vista responsive (desktop/móvil)  
- ✅ Animaciones de cambio de precio  

## 📦 Instalación Local

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

## 🌐 Desplegar en Vercel (Gratis)

### Paso 1: Subir a GitHub

```bash
# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit - NEXUS v1.0"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/nexus-trading-stats.git
git branch -M main
git push -u origin main
```

### Paso 2: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) y regístrate con GitHub
2. Click **"Add New Project"**
3. Selecciona tu repositorio `nexus-trading-stats`
4. **Configuración** (detectada automáticamente):
   - Framework: Next.js ✅
   - Build Command: `npm run build` ✅  
   - Output Directory: `.next` ✅
5. Click **"Deploy"**
6. Espera 2-3 minutos ⏳
7. ¡Listo! Tu sitio estará en: `https://tu-proyecto.vercel.app` 🎉

### ⚙️ Configuración Especial

**✅ No necesitas configurar nada**. La API funciona automáticamente porque:

- Usamos Next.js API Routes (`/app/api/crypto`)
- Las llamadas se hacen server-side (sin CORS)
- El plan gratuito de Vercel es suficiente

### Variables de Entorno (Opcional)

Si necesitas una API key de CoinGecko en el futuro:

1. En Vercel: **Settings** → **Environment Variables**
2. Añade: `COINGECKO_API_KEY` = `tu-key`
3. Redeploy

## 🔄 Actualizaciones

```bash
git add .
git commit -m "Descripción del cambio"
git push
# Vercel desplegará automáticamente en 1-2 min
```

## ✅ Verificación

1. ✅ Datos de CoinGecko cargan
2. ✅ API `/api/crypto` retorna 200 OK (DevTools → Network)
3. ✅ Auto-refresh funciona (60 seg)
4. ✅ Temas persisten al recargar
5. ✅ Responsive en móvil

## 🐛 Solución de Problemas

**Build failed:**
```bash
npm run build
# Revisa errores en consola
```

**API no funciona:**
- Vercel configura las API routes automáticamente
- CoinGecko tiene límite de ~50 req/min (gratis)

## 📊 Stack Tecnológico

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- CoinGecko API
- Canvas API (gráficos)

## 📄 Licencia

MIT

---

**¿Problemas?** Abre un issue en GitHub
