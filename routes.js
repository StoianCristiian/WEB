import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseDir = path.join(__dirname, 'app', 'Pages');

const routes = {
    '/': path.join(baseDir, 'Login', 'Login.html'),
    '/about': path.join(baseDir, 'AboutPage', 'index.html'),
};

export function getRoute(urlPath) {
    // Dacă e cerere pentru fișier static (css, js, etc.)
    if (/\.(css|js)$/i.test(urlPath)) {
        // Elimină slash-ul inițial și construiește calea relativă
        if(!urlPath.startsWith('/Login/')) {
            urlPath = '/Login' + urlPath;
        }
        return path.join(baseDir, urlPath.replace(/^\//, ''));
    }
    // Pentru rutele definite explicit
    return routes[urlPath] || path.join(baseDir, 'NotFoundPage', 'index.html');
}