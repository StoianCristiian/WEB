import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routes = {
    '/': path.join(__dirname, 'public', 'Pages', 'HomePage', 'index.html'),
    '/about': path.join(__dirname, 'public', 'Pages', 'AboutPage', 'index.html'),
    
}

export function getRoute(urlPath){
    return routes[urlPath] || path.join(__dirname, 'public', 'Pages', 'NotFoundPage', 'index.html');
}