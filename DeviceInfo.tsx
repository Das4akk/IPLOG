'use client';

import { useEffect, useState } from 'react';

interface DeviceInfoProps {
  ip: string;
  userAgent: string;
  acceptLanguage: string;
  secChUa: string;
  secChUaPlatform: string;
  secChUaMobile: string;
}

export default function DeviceInfo(props: DeviceInfoProps) {
  const [clientData, setClientData] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTime = () => {
      setClientData(prev => ({
        ...prev,
        'Локальное время': new Date().toLocaleString('ru-RU'),
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const nav = navigator as any;

    const data: Record<string, string> = {
      'IP-адрес': props.ip,
      'Браузер (User-Agent)': props.userAgent,
      'Браузер (Sec-CH-UA)': props.secChUa,
      'Платформа (Sec-CH-UA-Platform)': props.secChUaPlatform,
      'Мобильное устройство (Sec-CH-UA-Mobile)': props.secChUaMobile,
      'Предпочитаемые языки (HTTP)': props.acceptLanguage,
      'Языки (Client)': nav.languages ? nav.languages.join(', ') : nav.language,
      'Платформа (Client)': nav.platform,
      'Разрешение экрана': `${window.screen.width}x${window.screen.height}`,
      'Размер окна браузера (Viewport)': `${window.innerWidth}x${window.innerHeight}`,
      'Глубина цвета экрана': `${window.screen.colorDepth}-bit`,
      'Пиксельное соотношение (Device Pixel Ratio)': `${window.devicePixelRatio}x`,
      'Часовой пояс': Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      'Протокол': window.location.protocol.replace(':', '').toUpperCase(),
      'Хост': window.location.host,
      'Ориентация экрана': screen.orientation ? screen.orientation.type : 'Неизвестно',
      'Do Not Track': nav.doNotTrack === '1' ? 'Включен' : 'Отключен',
      'Cookies разрешены': nav.cookieEnabled ? 'Да' : 'Нет',
      'Аппаратная конкурентность (Ядра)': nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : 'Неизвестно',
      'Объем ОЗУ (ГБ)': nav.deviceMemory ? `>= ${nav.deviceMemory} ГБ` : 'Неизвестно'
    };

    // Connection info (Network Information API)
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (conn) {
      if (conn.effectiveType) data['Тип соединения'] = conn.effectiveType;
      if (conn.downlink) data['Скорость сети (Downlink)'] = `${conn.downlink} Мбит/с`;
      if (conn.rtt) data['Пинг (RTT)'] = `${conn.rtt} мс`;
      if (conn.saveData !== undefined) data['Режим экономии трафика'] = conn.saveData ? 'Включен' : 'Отключен';
    }

    setClientData(prev => ({...data, ...prev}));

    return () => clearInterval(interval);
  }, [props]);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-white pb-4">
        <h1 className="text-xl sm:text-2xl font-bold uppercase mb-2">MOGGED BY DAS4AKK, ЕГОРКА ГОНИ КЭС</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          ВСЕ ДАННЫЕ ОТОБРАЖАЮТСЯ ЛОКАЛЬНО. БЕЗ ПЕРЕДАЧИ НА СЕРВЕРЫ.
        </p>
      </div>

      <div className="flex flex-col">
        {Object.entries(clientData).map(([key, value]) => (
           <div key={key} className="flex flex-col sm:flex-row py-3 border-b border-white/20 hover:bg-white/5 transition-colors">
             <div className="sm:w-1/3 mb-1 sm:mb-0 text-gray-400 text-xs sm:text-sm uppercase tracking-wider pr-4">{key}</div>
             <div className="sm:w-2/3 text-sm sm:text-base break-all">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
