import { Hono } from 'hono'

const app = new Hono()

app.get('*', (c) => {
  const path = c.req.path

  if (path === '/' || !path) {
    return c.redirect('https://transportam.cat')
  }

  const deeplink = `transportam://${path}`

  const html = `
    <!DOCTYPE html>
    <html lang="ca">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Obrint l'app...</title>
        <style>
          body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; font-family: sans-serif; }
          .spinner { width: 40px; height: 40px; border: 4px solid #ccc; border-top-color: #333; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <div class="spinner"></div>
        <h1>S’està obrint l’app Transportam...</h1>
        <p>Si no s’obre automàticament, potser no tens l’app instal·lada.</p>
        <a href="https://transportam.cat/download">Descarregar</a>

        <script>
          window.location.href = "${deeplink}";
          setTimeout(() => {
            window.location.href = "https://transportam.cat/download";
          }, 3500);
        </script>
      </body>
    </html>
  `

  return c.html(html)
})

export default app
