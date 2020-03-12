/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// Версия кэша
const v = '1';

const staticCacheName = `static-cache-v${v}`;
const dynamicCacheName = `dynamic-cache-v${v}`;

const staticAssets = [
  '/',
  '/static/images/icons/icon@72x72.png',
  '/static/images/icons/icon@96x96.png',
  '/static/images/icons/icon@128x128.png',
  '/static/images/icons/icon@144x144.png',
  '/static/images/icons/icon@152x152.png',
  '/static/images/icons/icon@192x192.png',
  '/static/images/icons/icon@384x384.png',
  '/static/images/icons/icon@512x512.png',
  '/static/images/no-img.png',
  '/offline.html',
];

self.addEventListener('install', async (event) => {
  // const cache = await caches.open(staticCacheName);
  // await cache.addAll(staticAssets);
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => cache.addAll(staticAssets)),
  );
  console.log('Service worker has been installed');
});

self.addEventListener('activate', async (event) => {
  const cachesKeys = await caches.keys();
  const checkKeys = cachesKeys.map(async (key) => {
    if (![staticCacheName, dynamicCacheName].includes(key)) {
      await caches.delete(key);
    }
  });
  await Promise.all(checkKeys);
  console.log('Service worker has been activated');
});

self.addEventListener('fetch', (event) => {
  // укажем папки и запросы для исключения из кеша
  if (
    event.request.method !== 'GET'
    || event.request.url.indexOf('http://') === 0
    || event.request.url.indexOf('an.yandex.ru') !== -1
    || event.request.url.indexOf('/admin/') !== -1
    || event.request.url.indexOf('/accounts/') !== -1
    || event.request.url.indexOf('/projects/') !== -1
  ) {
    return;
  }

  console.log(`Trying to fetch ${event.request.url}`);
  if (event.request.mode === 'navigate') {
    // This is a navigation request, so respond with a
    // complete HTML document.
    event.respondWith(checkCache(event.request));
    // event.respondWith(fromCache(event.request));
    console.log('navigate');
    event.waitUntil(
      update(event.request)
        // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
        .then(refresh),
    );
  } else if (event.request.mode === 'same-origin') {

    // This is a same-origin request for a resource, so
    // respond appropriately depending on event.request.url, etc.
  }
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
}


/* async function fromCache(request) {
  return caches.open(staticCacheName).then((cache) =>
    cache.match(request).then((matching) =>
      matching || Promise.reject('no-match')
    ));
} */

async function update(request) {
  return caches.open(staticCacheName).then((cache) => fetch(request).then((response) => {
    cache.put(request, response.clone()).then(() => response);
    console.log('update');
    console.log(request);
    console.log(response);
    console.log(response.headers.get('ETag'));
  }));
}

// Шлём сообщения об обновлении данных всем клиентам.
async function refresh(response) {
  console.log('refresh');
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      // Подробнее про ETag можно прочитать тут
      // https://en.wikipedia.org/wiki/HTTP_ETag
      console.log(response);
      const message = {
        type: 'refresh',
        url: response !== undefined ? response.url : '',
        eTag: response !== undefined ? response.headers.get('ETag') : '',
      };
      // Уведомляем клиент об обновлении данных.
      console.log('refresh2');
      client.postMessage(JSON.stringify(message));
    });
  });
}


async function checkOnline(req) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedRes = await cache.match(req);
    if (cachedRes) {
      return cachedRes;
    // } else if (req.url.indexOf('.php') !== -1) {
    //    return caches.match('./offline.html');
    }
    return caches.match('./offline.html');
    // return caches.match('./local/templates/new_site_by_j-soft/images/no-img.png');
  }
}
