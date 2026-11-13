self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  await self.registration.unregister();
  const list = await self.clients.matchAll({ type: 'window' });
  list.forEach(c => c.navigate(c.url));
});
