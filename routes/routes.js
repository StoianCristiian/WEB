import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const baseDir = path.join(__dirname, '../app', 'Pages');

const routes = {
    '/': path.join(baseDir, 'HomePage', "Home.html"),
    '/login': path.join(baseDir, 'Login', 'Login.html'),
    '/admin': path.join(baseDir, 'AdminPage', 'Admin.html'),
    '/register': path.join(baseDir, 'RegisterPage', 'register.html'),
}

export function getRoute(urlPath){
    if (urlPath === '/favicon.ico') {
        return path.join(__dirname, '../app', 'Images', 'favicon.ico');
    }
    if(/\.(css|js|html)$/i.test(urlPath)) {
        const resolvedPath = path.normalize(path.join(baseDir, urlPath.replace(/^\//, '')));
        if (!resolvedPath.startsWith(baseDir)) {
            return path.join(baseDir, 'NotFoundPage', 'NotFound.html');
        }
        return resolvedPath;
    }
    return routes[urlPath] || path.join(baseDir, 'NotFoundPage', 'NotFound.html');
}