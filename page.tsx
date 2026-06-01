import { headers } from 'next/headers';
import DeviceInfo from '../components/DeviceInfo';

export default async function Home() {
  const headersList = await headers();
  // Get IP address from headers (works securely in server environments and proxies)
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  
  // Extract the true client IP, prioritizing forwarded proxy entries
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'IP не определен (Локальная сеть)');
  const userAgent = headersList.get('user-agent') || 'Неизвестное устройство';
  
  const acceptLanguage = headersList.get('accept-language') || 'Неизвестно';
  const secChUa = headersList.get('sec-ch-ua') || 'Неизвестно';
  const secChUaPlatform = headersList.get('sec-ch-ua-platform') || 'Неизвестно';
  const secChUaMobile = headersList.get('sec-ch-ua-mobile') || 'Неизвестно';

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <DeviceInfo 
        ip={ip} 
        userAgent={userAgent}
        acceptLanguage={acceptLanguage}
        secChUa={secChUa}
        secChUaPlatform={secChUaPlatform}
        secChUaMobile={secChUaMobile}
      />
    </main>
  );
}
